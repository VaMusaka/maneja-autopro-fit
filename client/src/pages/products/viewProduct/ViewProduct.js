import React from 'react'
import Decimal from 'decimal.js-light'
import PropTypes from 'prop-types'
import { Box, Divider, Grid, Typography } from '@mui/material'
import { MuiStyles } from 'theme'
import { BasicInfoGrid } from 'components/common'
import dayjs from 'dayjs'

const ViewProduct = ({ product }) => {
    const classes = MuiStyles()
    return (
        <Box>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h5">{product.name || 'Product'}</Typography>
                </Grid>
            </Grid>
            <Box className={classes.pt3}>
                <Divider />
            </Box>
            <BasicInfoGrid
                data={[
                    { title: 'Name', info: product.name },
                    {
                        title: 'Supplier',
                        info: product.supplier.name,
                    },
                    {
                        title: 'Purchase Category',
                        info: product.purchaseCategory.name,
                    },
                    {
                        title: 'Unit',
                        info: `£ ${new Decimal(product?.unitPrice).toFixed(2)} per ${product.unit}`,
                    },
                    { title: 'Description', info: product.description },
                    {
                        title: 'Created',
                        info: dayjs(product.created).format('DD MMM YYYY'),
                    },
                    {
                        title: 'Last Updated',
                        info: dayjs(product.updated).format('DD MMM YYYY'),
                    },
                ]}
            />
        </Box>
    )
}

ViewProduct.propTypes = {
    product: PropTypes.object.isRequired,
}

export default ViewProduct
