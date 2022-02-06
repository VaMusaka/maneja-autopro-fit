import React from 'react'
import { Alert, Box, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const PurchaseTableExpandableRow = ({ data }) => {
    console.log(data)
    return (
        <Box p={2}>
            <Alert severity={'info'}>
                <Typography>{data.details}</Typography>
            </Alert>
        </Box>
    )
}

PurchaseTableExpandableRow.propTypes = {
    data: PropTypes.object.isRequired,
}

export default PurchaseTableExpandableRow
