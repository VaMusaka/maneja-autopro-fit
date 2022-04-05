import React from 'react'
import { Box, Grid } from '@mui/material'
import { MuiStyles } from 'theme'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { intToString, invoiceIsPaidInFull, reduceToTotal } from 'utils'
import { Kpi } from 'components/vizualisations'

const BasicStats = ({ customer }) => {
    const unPaidInvoices = customer.invoices.filter((invoice) => !invoiceIsPaidInFull(invoice))
    const invoicesTotal = reduceToTotal(customer.invoices, 'total')

    //using balance payable to match the field from back-end added to the aggregation pipeline
    const unPaidInvoicedTotal = reduceToTotal(customer.invoices, 'balancePayable')

    const classes = MuiStyles()
    return (
        <Box className={clsx(classes.pt2, classes.pb4)}>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={4}>
                    <Kpi label="Invoices" value={customer.invoices?.length} action={null} />
                </Grid>

                <Grid item xs={12} sm={6} md={8}>
                    <Kpi
                        label="Invoices Amount"
                        value={`£ ${intToString(invoicesTotal)}`}
                        action={null}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Kpi
                        label="Un Paid Invoices"
                        color={'error'}
                        value={unPaidInvoices?.length}
                        action={null}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={8}>
                    <Kpi
                        label="Unpaid Invoices Amount"
                        color={'error'}
                        value={`£ ${intToString(unPaidInvoicedTotal)}`}
                        action={null}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

BasicStats.propTypes = {
    customer: PropTypes.object,
}

export default BasicStats
