import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import { companyDetails } from 'config'
import { getInvoiceDepartment } from '../constants'
import PropTypes from 'prop-types'

const AddressHeader = ({ invoice }) => {
    const [department, setDepartment] = useState(null)

    useEffect(() => {
        setDepartment(getInvoiceDepartment(invoice))
        // eslint-disable-next-line
    }, [])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} flexDirection={'column'} display={'flex'}>
                <Typography variant="subtitle1">TO </Typography>
                <Typography variant={'body1'}>{invoice?.customer?.name}</Typography>
                {invoice?.customer?.addressLine1 && (
                    <Typography variant={'body1'}>{invoice?.customer?.addressLine1}</Typography>
                )}
                {invoice?.customer?.addressLine2 && (
                    <Typography variant={'body1'}>{invoice?.customer?.addressLine2}</Typography>
                )}
                <Typography variant={'body1'}>{invoice?.customer?.town}</Typography>
                <Typography variant={'body1'}>{invoice?.customer?.postalCode}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} flexDirection={'column'} display={'flex'}>
                <Typography variant="subtitle1">FROM</Typography>
                <Typography variant={'body1'}>
                    {companyDetails.name}
                    {department?.showOnInvoice &&
                        department?.showOnInvoice &&
                        `- ${invoice.department}`}
                </Typography>
                <Typography variant={'body1'}>{companyDetails.address.line1}</Typography>
                <Typography variant={'body1'}>{companyDetails.address.line2}</Typography>
                <Typography variant={'body1'}>{companyDetails.address.city}</Typography>
                <Typography variant={'body1'}>{companyDetails.address.postalCode}</Typography>
            </Grid>
        </Grid>
    )
}

AddressHeader.propTypes = { invoice: PropTypes.object.isRequired }

export default AddressHeader
