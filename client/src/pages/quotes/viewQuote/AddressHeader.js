import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import { companyDetails } from 'config'
import { getQuoteDepartment } from '../constants'
import PropTypes from 'prop-types'

const AddressHeader = ({ quote }) => {
    const [department, setDepartment] = useState(null)

    useEffect(() => {
        setDepartment(getQuoteDepartment(quote))
        // eslint-disable-next-line
    }, [])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} flexDirection={'column'} display={'flex'}>
                <Typography variant="subtitle1">TO </Typography>
                <Typography variant={'body1'}>{quote?.customer?.name}</Typography>
                <Typography variant={'body1'}>{quote?.customer?.town}</Typography>
                <Typography variant={'body1'}>{quote?.customer?.postalCode}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} flexDirection={'column'} display={'flex'}>
                <Typography variant="subtitle1">FROM</Typography>
                <Typography variant={'body1'}>
                    {companyDetails.name}
                    {department?.showOnQuote && department?.showOnQuote && `- ${quote.department}`}
                </Typography>
                <Typography variant={'body1'}>{companyDetails.address.line1}</Typography>
                <Typography variant={'body1'}>{companyDetails.address.line2}</Typography>
                <Typography variant={'body1'}>{companyDetails.address.city}</Typography>
                <Typography variant={'body1'}>{companyDetails.address.postalCode}</Typography>
            </Grid>
        </Grid>
    )
}

AddressHeader.propTypes = { quote: PropTypes.object.isRequired }

export default AddressHeader
