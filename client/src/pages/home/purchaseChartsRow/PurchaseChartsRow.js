import React from 'react'
import { useSelector } from 'react-redux'
import { dataServiceSelector } from 'redux/selectors'
import { Grid, Typography } from '@mui/material'
import { BarChart, LineChart } from 'components/vizualisations'
import { getShortMonth } from 'utils'
import { nanoid } from 'nanoid'

const PurchaseChartsRow = () => {
    const { purchases } = useSelector(dataServiceSelector)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant={'h4'}>Purchases</Typography>
            </Grid>
            <Grid item sm={6} md={6} xs={12}>
                {purchases?.byMonth && (
                    <LineChart
                        data={purchases?.byMonth?.map((item) => {
                            return { ...item, month: getShortMonth(item._id) }
                        })}
                        title="Monthly Expense Total (£)"
                        height={300}
                        dimension={{
                            label: 'Month',
                            field: 'month',
                            grid: 12,
                        }}
                        measure={{
                            label: '£ Expense Total',
                            field: 'sum',
                        }}
                        showTooltip
                    />
                )}
            </Grid>
            <Grid item sm={6} md={6} xs={12}>
                {purchases?.byMonth && (
                    <BarChart
                        data={purchases?.byMonth?.map((item) => {
                            return { ...item, month: getShortMonth(item._id) }
                        })}
                        title="Monthly Purchase Invoices"
                        height={300}
                        dimension={{
                            label: 'Month',
                            field: 'month',
                            grid: 12,
                        }}
                        measure={{
                            label: '# Purchases',
                            field: 'count',
                        }}
                        showTooltip
                    />
                )}
            </Grid>
            <Grid item sm={6} md={4} xs={12}>
                {purchases?.byYear && (
                    <BarChart
                        data={purchases?.byYear?.map((item) => {
                            return { ...item, year: String(item._id) }
                        })}
                        title="Yearly Expense Total (£)"
                        height={300}
                        dimension={{
                            label: 'Year',
                            field: '_id',
                            grid: 12,
                        }}
                        measure={{
                            label: '£ Expense Total',
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
                {purchases?.bySupplier && (
                    <BarChart
                        chartId={nanoid()}
                        data={purchases?.bySupplier?.map((item) => {
                            return { ...item, supplier: item.supplier.name }
                        })}
                        title="Top 20 Expense Supplier"
                        height={300}
                        dimension={{
                            label: 'Supplier',
                            field: 'supplier',
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
export default PurchaseChartsRow
