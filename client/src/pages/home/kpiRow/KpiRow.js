import React from 'react'
import { useSelector } from 'react-redux'
import { dataServiceSelector } from 'redux/selectors'
import { formatNumber } from 'utils'
import { Kpi } from 'components/vizualisations'
import { Grid } from '@mui/material'
import { useHistory } from 'react-router-dom'

const KpiRow = () => {
    const { invoices, purchases, customers } = useSelector(dataServiceSelector)
    const history = useHistory()

    const KPIS = [
        {
            label: 'Customers',
            value: formatNumber(customers.count),
            action: {
                icon: 'FolderOpen',
                tooltip: 'View Customers',
                callback: () => history.push('/customers'),
            },
        },
        /*       {
            label: 'Suppliers',
            value: formatNumber(suppliers.count),
            action: {
                icon: 'FolderOpen',
                tooltip: 'View Customers',
                callback: () => history.push('/suppliers'),
            },
        },
        
  */
        {
            label: 'Invoices',
            value: formatNumber(invoices.count),
            action: {
                icon: 'FolderOpen',
                tooltip: 'View Invoices',
                callback: () => history.push('/invoices'),
            },
        },
        {
            label: 'Purchases',
            value: formatNumber(purchases.count),
            action: {
                icon: 'FolderOpen',
                tooltip: 'View Purchases',
                callback: () => history.push('/purchases'),
            },
        },
        {
            label: 'Invoice Total',
            value: `£ ${formatNumber(invoices.total, 0, invoices.total >= 1000000)}`,
            action: null,
        },
        {
            label: 'Expenses Total',
            value: `£ ${formatNumber(purchases.total, 0, purchases.total >= 1000000)}`,
            action: null,
        },
        /*{
            label: 'Profit',
            value: `£ ${formatNumber(
                invoices.total - purchases.total,
                0,
                invoices.total - purchases.total >= 1000000
            )}`,
            action: null,
        },*/
        {
            label: 'Balance Un Paid',
            value: `£ ${formatNumber(invoices.unPaidTotal, 0, invoices.unPaidTotal >= 1000000)}`,
            action: null,
        },
    ]

    return (
        <Grid container spacing={1}>
            {KPIS.map(({ label, value, action }, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Kpi label={label} value={value} action={action} />
                </Grid>
            ))}
        </Grid>
    )
}

export default KpiRow
