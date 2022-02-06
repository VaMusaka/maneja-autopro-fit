import React from 'react'
import PropTypes from 'prop-types'
import { Box, Divider, Grid, Typography } from '@mui/material'
import { MuiStyles } from 'theme'
import { BasicInfoGrid } from 'components/common'
import dayjs from 'dayjs'

const ViewPurchase = ({ purchase }) => {
    const classes = MuiStyles()
    return (
        <Box>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h5">{purchase.name || 'Purchase Category'}</Typography>
                </Grid>
            </Grid>

            <Box className={classes.pt3}>
                <Divider />
            </Box>

            <BasicInfoGrid
                data={[
                    { title: 'Invoice #', info: purchase.invoice.autoId },
                    { title: 'Description', info: purchase.details },
                    { title: 'Supplier', info: purchase.supplier.name },
                    { title: 'Purchase Category', info: purchase.purchaseCategory.name },
                    {
                        title: 'Purchase Invoice Lines',
                        info: `
                        Count: ${purchase?.invoiceLines.count}, 
                        Billed: ${purchase?.invoiceLines?.billed}, 
                        Delivered: ${purchase?.invoiceLines?.delivered}`,
                    },
                    { title: 'Total', info: `£ ${purchase.total}` },
                    {
                        title: 'Created',
                        info: dayjs(purchase.created).format('DD MMM YYYY'),
                    },
                    {
                        title: 'Last Updated',
                        info: dayjs(purchase.updated).format('DD MMM YYYY'),
                    },
                ]}
            />
        </Box>
    )
}

ViewPurchase.propTypes = {
    purchase: PropTypes.object.isRequired,
}

export default ViewPurchase
