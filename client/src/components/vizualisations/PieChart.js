import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_material from '@amcharts/amcharts4/themes/material'
import { MuiStyles } from 'theme'
import { Box, Paper, Typography } from '@mui/material'
import { getChartHeight } from 'utils'
import clsx from 'clsx'
import { nanoid } from 'nanoid'

const chartId = nanoid()

const PieChart = ({ title, data, dimension, measure, height, footer, showTooltip, legend }) => {
    const classes = MuiStyles()
    am4core.useTheme(am4themes_material)

    let chart = am4core.create(chartId, am4charts.PieChart)

    // Add data
    chart.data = data
    chart.innerRadius = am4core.percent(60)
    chart.responsive.enabled = true
    chart.responsive.useDefault = false

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries())

    pieSeries.colors.list = [
        am4core.color('#102C51'),
        am4core.color('#4e4d91'),
        am4core.color('#00a676'),
        am4core.color('#0c5776'),
        am4core.color('#ffc018'),
        am4core.color('#ff40b4'),
    ]

    pieSeries.dataFields.value = measure.field
    pieSeries.dataFields.category = dimension.field
    pieSeries.name = title
    pieSeries.slices.template.strokeOpacity = 1

    // Disable ticks and labels
    pieSeries.labels.template.disabled = true
    pieSeries.ticks.template.disabled = true

    if (showTooltip) {
        pieSeries.slices.template.tooltipText = `{category.formatNumber('####')} : £ {value.value}`
    } else {
        // Disable tooltips
        pieSeries.slices.template.tooltipText = ''
    }

    // Add a legend
    if (legend) {
        chart.legend = new am4charts.Legend()
        chart.legend.position = legend.position
        chart.legend.labels.template.text = `[bold {color}]{category.formatNumber('####')}[/]`
    }

    useEffect(() => {
        return () => {
            chart.dispose()
        }
        // eslint-disable-next-line
    }, [])

    return (
        <Paper>
            <Box p={1}>
                {title && (
                    <Box classes={clsx(classes.pv2, classes.ph2)}>
                        <Typography variant={'h5'}>{title}</Typography>
                    </Box>
                )}
                <Box height={getChartHeight(height, title, footer)}>
                    <div id={chartId} style={{ width: '100%', height: '100%' }} />
                </Box>
            </Box>
        </Paper>
    )
}

PieChart.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array.isRequired,
    height: PropTypes.number,
    dimension: PropTypes.object.isRequired,
    measure: PropTypes.object.isRequired,
    showTooltip: PropTypes.bool,
    legend: PropTypes.object,
    footer: PropTypes.string,
}
PieChart.defaultProps = {
    legend: null,
    title: null,
    footer: null,
}
export default PieChart
