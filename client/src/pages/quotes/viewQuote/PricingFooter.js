import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import { MuiStyles } from 'theme'
import clsx from 'clsx'

const AmountRow = ({ title, amount }) => {
    const classes = MuiStyles()
    return (
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} height={30}>
            <Typography variant={'subtitle1'}>{title}</Typography>
            <Typography variant={'body1'} className={classes.fw8}>
                £ {amount}
            </Typography>
        </Box>
    )
}

const PricingFooter = ({ quote }) => {
    const classes = MuiStyles()

    return (
        <Box className={clsx(classes.pt2)} width={250}>
            <AmountRow title={'Sub Total'} amount={quote?.subTotal?.toFixed(2) || 0.0} />
            <AmountRow title={'VAT'} amount={quote?.vatAmount?.toFixed(2) || 0.0} />
            <AmountRow title={'Total'} amount={quote?.total?.toFixed(2) || 0.0} />
        </Box>
    )
}

PricingFooter.propTypes = {
    quote: PropTypes.object.isRequired,
}

AmountRow.propTypes = {
    title: PropTypes.string.isRequired,
    amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}
export default PricingFooter
