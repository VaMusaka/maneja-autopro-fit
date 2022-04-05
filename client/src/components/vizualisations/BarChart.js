import React from 'react'
import { Bar } from 'react-chartjs-2'
import PropTypes from 'prop-types'
import { Box, Typography, Paper } from '@mui/material'
import { MuiStyles } from 'theme'
import { getChartHeight } from 'utils'
import { nanoid } from 'nanoid'

const chartId = nanoid()

const BarChart = ({ title, footer, height, data, dimension, measure }) => {
    const classes = MuiStyles()
    const dataSetup = {
        labels: data?.map((data) => data[dimension.field]),
        datasets: [
            {
                label: measure.label,
                data: data?.map((data) => data[measure.field]),
                fill: true,
                backgroundColor: '#102C51',
                borderColor: '#102C51',
                cubicInterpolationMode: 'monotone',
                tension: 0.4,
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        borderRadius: 20,
        tooltips: {
            enabled: true,
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: false,
                    },
                },
            ],
        },
    }

    return (
        <Paper>
            <Box p={1}>
                {title && (
                    <Box classes={classes.pv2}>
                        <Typography variant={'h5'}>{title}</Typography>
                    </Box>
                )}

                <Box height={getChartHeight(height, title, footer)}>
                    <Bar
                        id={chartId}
                        width="100%"
                        height="100%"
                        redraw={false}
                        data={dataSetup}
                        options={options}
                    />
                </Box>

                {footer && (
                    <Box classes={classes.pv2}>
                        <Typography variant={'body2'}>{footer}</Typography>
                    </Box>
                )}
            </Box>
        </Paper>
    )
}

BarChart.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array.isRequired,
    height: PropTypes.number.isRequired,
    dimension: PropTypes.object.isRequired,
    measure: PropTypes.object.isRequired,
    showTooltip: PropTypes.bool,
    footer: PropTypes.string,
}

BarChart.defaultProps = {
    title: '',
    showTooltip: false,
}

export default BarChart
