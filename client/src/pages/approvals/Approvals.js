import React, { useState, useEffect } from 'react'
import { AgGridColumn, AgGridReact } from 'ag-grid-react'
import DefaultLayout from 'components/layout/default'
import { Paper, Box, Typography, Grid, Button } from '@mui/material'
import { getApprovals, updateApproval } from 'api/approvals'
import { useDispatch, useSelector } from 'react-redux'
import { customersSelector, servicesSelector, suppliersSelector } from 'redux/selectors'
import { MuiDatepicker, MuiSelectField } from 'components/common'
import { companyDetails } from 'config'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { getCustomersAction } from 'redux/customers/actions'
import { getServicesAction } from 'redux/services/actions'

import {
    columnGroups,
    frameworkComponents,
    purchaseDetailsColumns,
    invoiceLineColumns,
} from './constants'
import { getSuppliersAction } from 'redux/suppliers/actions'
import PurchaseSupplier from './columnViews/purchaseDetails/PurchaseSupplier'
import PurchaseInvoiceDate from './columnViews/purchaseDetails/PurchaseInvoiceDate'
import dayjs from 'dayjs'
import { reduceToTotal } from 'utils'
import ApprovedCheckbox from './columnInput/ApprovedCheckbox'
import ApprovedChip from './columnViews/ApprovedChip'
import { updatePurchase } from 'api/purchases'
import ApprovalService from './columnViews/ApprovalService'
import { InvoiceLineVat, InvoiceLineTotal } from './columnViews/InvoiceLineHelpers'
import MuiPallete from 'theme/palette'

const Approvals = () => {
    const [approvalsDate, setApprovalsDate] = useState(null)
    const [salesTotal, setSalesTotal] = useState(0)
    const [purchasesTotal, setPurchasesTotal] = useState(0)
    const [approvalsDepartment, setApprovalsDepartment] = useState(null)
    const [approvals, setApprovals] = useState(null)
    const [gridApi, setGridApi] = useState(null)
    // const [gridColumnApi, setGridColumnApi] = useState(null)

    const [selectedInvoicePurchases, setSelectedInvoicePurchases] = useState(null)
    const [selectedInvoiceLines, setSelectedInvoiceLines] = useState(null)

    const dispatch = useDispatch()
    const { customers, loading: customersLoading } = useSelector(customersSelector)
    const { services, loading: servicesLoading } = useSelector(servicesSelector)
    const { suppliers, loading: suppliersLoading } = useSelector(suppliersSelector)

    const loading = servicesLoading || customersLoading || suppliersLoading
    const { departments } = companyDetails

    useEffect(() => {
        ;(async () => {
            const { data } = await getApprovals({ date: approvalsDate })
            setApprovals(data)
        })()

        if (!customers && !customersLoading) {
            dispatch(getCustomersAction())
        }

        if (!services && !servicesLoading) {
            dispatch(getServicesAction())
        }

        if (!suppliers && !suppliersLoading) {
            dispatch(getSuppliersAction())
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (approvals) {
            const approvedItems = approvals.filter(({ status }) => status === true)
            if (approvedItems) {
                const sales = reduceToTotal(approvedItems, 'total')
                setSalesTotal(sales)
            }
        }

        if (selectedInvoicePurchases) {
            const expenses = reduceToTotal(selectedInvoicePurchases, 'total')
            setPurchasesTotal(expenses)
        }
    }, [selectedInvoicePurchases, approvals])

    const filterApprovals = async () => {
        const { data } = await getApprovals({
            date: approvalsDate,
            department: approvalsDepartment,
        })

        setSelectedInvoicePurchases(null)
        setApprovals(data)
    }

    const onCellValueChanged = async (event) => {
        const { field } = event.colDef
        const invoiceDepartment = departments.find(
            ({ name }) => name === event?.data?.invoice?.department
        )

        const { data } = await updateApproval({
            id: event.data._id,
            chargeVat: !invoiceDepartment?.invoicesVatExempt,
            [field]: event.value,
        })

        const updatedApprovals = approvals.map((approval) => {
            if (approval._id === data._id) {
                return data
            }

            return approval
        })
        setApprovals(updatedApprovals)
    }

    const purchaseCellChanged = async (event) => {
        const { field } = event.colDef

        const { data } = await updatePurchase({ _id: event.data._id, [field]: event.value })

        const updatedPurchases = selectedInvoicePurchases.map((purchase) => {
            if (purchase._id === data._id) {
                return data
            }

            return purchase
        })
        setSelectedInvoicePurchases(updatedPurchases)
    }

    const onGridReady = (params) => {
        setGridApi(params.api)
        // setGridColumnApi(params.columnApi)
    }

    const highValueCustomerRowStyle = ({ data }) => {
        const { highValue } = customers?.find(({ _id }) => _id === data?.invoice?.customer)

        const isCardPayment = data?.invoice?.payments?.card > 0

        return {
            background: highValue || isCardPayment ? MuiPallete.accent.main : 'inherit',
        }
    }

    const onSelectionChanged = () => {
        const selectedInvoice = gridApi.getSelectedRows()
        setSelectedInvoicePurchases(selectedInvoice[0]?.purchases)
        setSelectedInvoiceLines(selectedInvoice[0]?.invoice?.lines)
    }

    const centerStyle = {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    }

    if (loading) {
        return 'Loading'
    }

    const rows = approvals && approvals.length <= 15 ? approvals?.length : 15
    let approvalsTableHeight = rows * 42.3

    return (
        <DefaultLayout title={'Sales approvals'}>
            <Paper>
                <Box p={2} width={'100%'}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={3}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Box width={'100%'} style={centerStyle}>
                                        <Typography variant={'h4'}>£ {salesTotal}</Typography>
                                        <Typography variant={'overline'}>
                                            New Sales Total
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box
                                        width={'100%'}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Typography variant={'h4'}>£ {purchasesTotal}</Typography>
                                        <Typography variant={'overline'}>
                                            Purchases Total
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={3} height={75} style={centerStyle}>
                            <MuiSelectField
                                name={'department'}
                                label={'Department'}
                                defaultValue={approvalsDepartment}
                                options={
                                    departments?.map(({ name }) => {
                                        return { value: name, label: name }
                                    }) || []
                                }
                                handleChange={(event, selected) => {
                                    setApprovalsDepartment(selected?.value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} height={75} style={centerStyle}>
                            <MuiDatepicker
                                label={'Approval Date'}
                                name={'approvalDate'}
                                value={approvalsDate}
                                onChange={(date) => {
                                    setApprovalsDate(dayjs(date).format('YYYY/MM/DD'))
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={3} height={75} style={centerStyle}>
                            <Button variant={'contained'} onClick={filterApprovals}>
                                Filter
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                <Box p={2} width={'100%'}>
                    <div
                        className="ag-theme-alpine"
                        style={{ width: '100%', height: `${approvalsTableHeight + 160}px` }}
                    >
                        <AgGridReact
                            rowData={approvals}
                            rowSelection={'single'}
                            onGridReady={onGridReady}
                            onSelectionChanged={onSelectionChanged}
                            onCellValueChanged={onCellValueChanged}
                            frameworkComponents={frameworkComponents}
                            getRowStyle={highValueCustomerRowStyle}
                        >
                            {columnGroups.map(({ columns, headerName }, index) => (
                                <AgGridColumn key={index} headerName={headerName}>
                                    {columns.map((props, index) => (
                                        <AgGridColumn key={index} {...props} />
                                    ))}
                                </AgGridColumn>
                            ))}
                        </AgGridReact>
                    </div>
                </Box>

                <Box p={2} width={'100%'}>
                    <Typography variant={'overline'}>{'Selected Invoice Lines'}</Typography>
                    {selectedInvoiceLines && (
                        <div className="ag-theme-alpine" style={{ width: '100%', height: '200px' }}>
                            <AgGridReact
                                onGridReady={({ api }) => {
                                    api.sizeColumnsToFit()
                                }}
                                frameworkComponents={{
                                    approvalService: ApprovalService,
                                    invoiceLineVat: InvoiceLineVat,
                                    invoiceLineTotal: InvoiceLineTotal,
                                }}
                                rowData={selectedInvoiceLines}
                            >
                                {invoiceLineColumns.map((props, index) => (
                                    <AgGridColumn key={index} {...props} />
                                ))}
                            </AgGridReact>
                        </div>
                    )}
                </Box>

                <Box p={2} width={'100%'}>
                    <Typography variant="overline">
                        {selectedInvoicePurchases ? 'Selected Invoice ' : 'Select Invoice to see '}
                        Purchases
                    </Typography>

                    {selectedInvoicePurchases && (
                        <div className="ag-theme-alpine" style={{ width: '100%', height: '200px' }}>
                            <AgGridReact
                                rowData={selectedInvoicePurchases}
                                onGridReady={({ api }) => {
                                    api.sizeColumnsToFit()
                                }}
                                onCellValueChanged={purchaseCellChanged}
                                frameworkComponents={{
                                    purchaseSupplier: PurchaseSupplier,
                                    purchaseInvoiceDate: PurchaseInvoiceDate,
                                    approvedCheckbox: ApprovedCheckbox,
                                    approvedStatus: ApprovedChip,
                                }}
                            >
                                {purchaseDetailsColumns.map((props, index) => (
                                    <AgGridColumn key={index} {...props} />
                                ))}
                            </AgGridReact>
                        </div>
                    )}
                </Box>
            </Paper>
        </DefaultLayout>
    )
}

export default Approvals
