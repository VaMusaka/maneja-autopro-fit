import React, { useEffect, useState } from 'react'
import { Box, Paper, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material'
import DataTable from 'react-data-table-component'
import { useSelector, useDispatch } from 'react-redux'
import { invoicesSelector } from 'redux/selectors'
import { getInvoicesAction, searchInvoiceAction } from 'redux/invoices/actions'
import { invoiceTableColumns, conditionalRowStyles } from '../constants'
import { MuiDrawer, MuiSearchBar } from 'components/common'
import CreateInvoice from 'pages/invoices/createInvoice'
import { toggleCreateDrawer } from 'utils'
import InvoiceTableExpandableRow from './InvoiceTableExpandableRow'
import { MuiStyles } from 'theme'
import { isEmpty } from 'lodash'

const InvoiceTable = () => {
    const [tableTitle, setTableTitle] = useState(`INVOICES`)
    const [invoicePaymentStatus, setInvoicePaymentStatus] = useState('all')
    const classes = MuiStyles()
    const [drawerOpen, setDrawerOpen] = useState(false)
    const dispatch = useDispatch()
    const { invoices, loading, layout } = useSelector(invoicesSelector)

    const getInvoices = () => dispatch(getInvoicesAction())

    useEffect(() => {
        getInvoices()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setDrawerOpen(layout.openCreateDrawer)
    }, [layout.openCreateDrawer])

    const handleClearSearch = () => {
        dispatch(getInvoicesAction())
        setTableTitle('INVOICES')
    }

    const handleInvoiceSearch = (search) => {
        if (isEmpty(search)) {
            handleClearSearch()
        } else {
            dispatch(searchInvoiceAction({ search }))
            setTableTitle('SEARCH RESULTS')
        }
    }

    const handlePaymentFilter = (e, value) => {
        setInvoicePaymentStatus(value)
        if (value === 'all') {
            setTableTitle('INVOICES')
            return dispatch(getInvoicesAction())
        }

        const title = value ? 'PAID INVOICES' : 'UNPAID INVOICES'
        setTableTitle(title)
        return dispatch(getInvoicesAction({ 'payments.paidInFull': value }))
    }

    return (
        <Paper>
            <Box p={3}>
                <Box className={classes.pb2}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} sm={8}>
                            <Box width={'100%'}>
                                <MuiSearchBar
                                    placeholder={'Search Invoice # | Vehicle Model - Reg'}
                                    handleClear={handleClearSearch}
                                    handleSearch={handleInvoiceSearch}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <ToggleButtonGroup
                                onChange={handlePaymentFilter}
                                fullWidth
                                exclusive
                                size={'medium'}
                                value={invoicePaymentStatus}
                            >
                                <ToggleButton value={'all'}>ALL</ToggleButton>
                                <ToggleButton value={true}>PAID</ToggleButton>
                                <ToggleButton value={false}>UN PAID</ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                </Box>
                <DataTable
                    actions={[
                        <MuiDrawer
                            key={'create'}
                            openButtonText={'Create Invoice'}
                            open={drawerOpen}
                            handleOpen={() =>
                                toggleCreateDrawer(dispatch, layout, 'UPDATE_INVOICES_LAYOUT', true)
                            }
                            handleClose={() =>
                                toggleCreateDrawer(
                                    dispatch,
                                    layout,
                                    'UPDATE_INVOICES_LAYOUT',
                                    false
                                )
                            }
                        >
                            <CreateInvoice />
                        </MuiDrawer>,
                    ]}
                    title={tableTitle}
                    progressPending={loading}
                    fixedHeader
                    fixedHeaderScrollHeight="90vh"
                    highlightOnHover
                    expandableRows
                    pagination
                    expandableRowsComponent={InvoiceTableExpandableRow}
                    persistTableHead
                    responsive
                    striped
                    subHeaderAlign="left"
                    subHeaderWrap
                    columns={invoiceTableColumns}
                    conditionalRowStyles={conditionalRowStyles}
                    data={invoices || []}
                />
            </Box>
        </Paper>
    )
}

export default InvoiceTable
