import React from 'react'
import PropTypes from 'prop-types'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import { getShortMonth } from 'utils'

const InvoicesByMonth = ({ title, data, height, dimension, measure, showTooltip }) => {
    // Create chart instance
    let chart = am4core.create('chartdiv', am4charts.XYChart)

    const dataWithMonth = data?.map((item) => {
        return { ...item, month: getShortMonth(item._id) }
    })

    console.log(dataWithMonth)

    // Add data
    chart.data = dataWithMonth
    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    categoryAxis.dataFields.category = dimension.field
    categoryAxis.title.text = dimension.label
    categoryAxis.renderer.minGridDistance = dimension.grid || 12

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
    valueAxis.title.text = measure.label

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries())
    series.dataFields.valueY = measure.field
    series.dataFields.categoryX = dimension.field
    series.name = title
    if (showTooltip) {
        series.columns.template.tooltipText = '{name}\n {categoryX}: £ {valueY}'
    }
    series.columns.template.fill = am4core.color('#102C51') // fill
    series.columns.template.width = 10
    series.columns.template.column.cornerRadiusTopLeft = 10
    series.columns.template.column.cornerRadiusTopRight = 10

    return <div id={'chartdiv'} style={{ width: '100%', height }} />
}

InvoicesByMonth.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array.isRequired,
    height: PropTypes.number,
    dimension: PropTypes.object.isRequired,
    measure: PropTypes.object.isRequired,
    showTooltip: PropTypes.bool,
}

InvoicesByMonth.defaultProps = {
    height: 300,
    title: '',
    showTooltip: false,
}

export default InvoicesByMonth
