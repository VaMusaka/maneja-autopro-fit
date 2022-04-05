import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import DataTable from 'react-data-table-component'
import { Alert, Box, Divider, Grid, Tooltip, Typography } from '@mui/material'
import { MuiStyles } from 'theme'
import { miniInvoiceTableColumns } from 'pages/invoices/constants'
import { MuiTabs, BasicInfoGrid, MuiIcon } from 'components/common'
import { getInfoGridCustomerDetails, invoiceIsPaidInFull } from 'utils'
import BasicStats from './BasicStats'
import { useDispatch, useSelector } from 'react-redux'
import { customersSelector } from 'redux/selectors'
import { getCustomerAction } from 'redux/customers/actions'
import PrintCustomerStatement from '../printCustomerStatement'
import { companyDetails } from 'config'

const ViewCustomer = ({ _id }) => {
    const [unPaidInvoices, setUPaidInvoices] = useState(null)
    const classes = MuiStyles()
    const dispatch = useDispatch()
    const { customer } = useSelector(customersSelector)
    const { departments } = companyDetails

    useEffect(() => {
        dispatch(getCustomerAction(_id))

        return () => {
            dispatch({ type: 'GET_CUSTOMER', payload: null })
        }
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (customer) {
            const unpaid = departments.map(({ name }) => {
                return {
                    department: name,
                    invoices: customer?.invoices?.filter(
                        (invoice) => !invoiceIsPaidInFull(invoice) && invoice.department === name
                    ),
                }
            })

            setUPaidInvoices(unpaid)
        }
    }, [customer, departments])

    return (
        <Box>
            {customer && (
                <>
                    <Grid container>
                        <Grid item xs={12}>
                            <Box display={'flex'} alignItems={'center'} flexDirection={'row'}>
                                {customer.highValue && (
                                    <Tooltip placement={'right'} title={'High Value Customer'}>
                                        <Box className={classes.pr1}>
                                            <MuiIcon name={'DoneAll'} />
                                        </Box>
                                    </Tooltip>
                                )}
                                <Typography variant="h5">{customer.name || 'Customer'}</Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    <Box className={classes.pt3}>
                        <Divider />
                        {customer?.invoices.length === 500 && (
                            <Box className={classes.pt2}>
                                <Alert severity="warning">
                                    This Customer may have more than 500 invoices.
                                </Alert>
                            </Box>
                        )}
                    </Box>

                    <MuiTabs
                        content={[
                            {
                                label: 'Details',
                                tabContent: (
                                    <>
                                        <BasicStats customer={customer} />
                                        <BasicInfoGrid
                                            data={getInfoGridCustomerDetails(customer)}
                                        />
                                    </>
                                ),
                            },
                            {
                                label: 'Invoices',
                                tabContent: (
                                    <DataTable
                                        title={'CUSTOMER INVOICES'}
                                        fixedHeader
                                        highlightOnHover
                                        pagination
                                        persistTableHead
                                        responsive
                                        striped
                                        subHeaderAlign="right"
                                        subHeaderWrap
                                        actions={
                                            <>
                                                {unPaidInvoices?.map(({ department, invoices }) => (
                                                    <PrintCustomerStatement
                                                        key={department}
                                                        customer={customer}
                                                        invoices={invoices}
                                                        department={department}
                                                    />
                                                ))}
                                            </>
                                        }
                                        columns={miniInvoiceTableColumns}
                                        data={customer.invoices}
                                    />
                                ),
                            },
                        ]}
                    />
                </>
            )}
        </Box>
    )
}

ViewCustomer.propTypes = {
    _id: PropTypes.string.isRequired,
}

export default ViewCustomer
