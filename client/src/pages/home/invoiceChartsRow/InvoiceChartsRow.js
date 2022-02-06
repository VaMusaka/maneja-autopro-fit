import React from 'react'
import { useSelector } from 'react-redux'
import { dataServiceSelector } from 'redux/selectors'
import { Grid, Typography } from '@mui/material'
import { BarChart, LineChart } from 'components/vizualisations'
import { getShortMonth } from 'utils'
import { nanoid } from 'nanoid'

const InvoiceChartsRow = () => {
    const { invoices } = useSelector(dataServiceSelector)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant={'h4'}>Invoices</Typography>
            </Grid>
            <Grid item sm={6} md={6} xs={12}>
                {invoices?.byMonth && (
                    <LineChart
                        data={invoices?.byMonth?.map((item) => {
                            return { ...item, month: getShortMonth(item._id) }
                        })}
                        title="Monthly Invoice Total (£)"
                        height={300}
                        dimension={{
                            label: 'Month',
                            field: 'month',
                            grid: 12,
                        }}
                        measure={{
                            label: '£ Total Sales',
                            field: 'sum',
                        }}
                        showTooltip
                    />
                )}
            </Grid>
            <Grid item sm={6} md={6} xs={12}>
                {invoices?.byMonth && (
                    <BarChart
                        data={invoices?.byMonth?.map((item) => {
                            return { ...item, month: getShortMonth(item._id) }
                        })}
                        title="Monthly Invoices"
                        height={300}
                        dimension={{
                            label: 'Month',
                            field: 'month',
                            grid: 12,
                        }}
                        measure={{
                            label: '# Invoices',
                            field: 'count',
                        }}
                        showTooltip
                    />
                )}
            </Grid>
            <Grid item sm={6} md={4} xs={12}>
                {invoices?.byYear && (
                    <BarChart
                        data={invoices?.byYear?.map((item) => {
                            return { ...item, year: String(item._id) }
                        })}
                        title="Yearly Invoice Total (£)"
                        height={300}
                        dimension={{
                            label: 'Year',
                            field: '_id',
                            grid: 12,
                        }}
                        measure={{
                            label: '£ Total Sales',
                            field: 'sum',
                        }}
                        showTooltip
                        legend={{
                            position: 'right',
                        }}
                    />
                )}
            </Grid>

            <Grid item sm={6} md={8} xs={12}>
                {invoices?.topByCustomers && (
                    <BarChart
                        chartId={nanoid()}
                        data={invoices?.topByCustomers?.map((item) => {
                            return { ...item, customer: item.customer.name }
                        })}
                        title="Top 20 Customer Invoice Total"
                        height={300}
                        dimension={{
                            label: 'Customer',
                            field: 'customer',
                            // grid: 5,
                        }}
                        measure={{
                            label: '£ Total Sales',
                            field: 'sum',
                        }}
                        showTooltip
                        legend={{
                            position: 'right',
                        }}
                    />
                )}
            </Grid>
        </Grid>
    )
}
export default InvoiceChartsRow
