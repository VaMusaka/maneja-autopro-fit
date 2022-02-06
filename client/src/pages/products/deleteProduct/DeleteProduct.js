import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { deleteProductAction } from 'redux/products/actions'
import { Alert, Box, Button, Divider, Grid, Typography } from '@mui/material'
import { MuiStyles } from 'theme'
import { BasicInfoGrid } from 'components/common'
import clsx from 'clsx'
import dayjs from 'dayjs'

const DeleteProduct = ({ product }) => {
    const dispatch = useDispatch()
    const classes = MuiStyles()
    return (
        <Box>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h5" color={'error'}>
                        Delete Product
                    </Typography>
                    <Typography variant={'subtitle1'}>{product.name || 'Product'}</Typography>
                </Grid>
            </Grid>

            <Box className={clsx(classes.pt3, classes.pb3)}>
                <Divider />
            </Box>

            <Box>
                <BasicInfoGrid
                    data={[
                        { title: 'Name', info: product.name },
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

            <Box className={classes.pt3}>
                <Alert severity={'warning'} color={'error'}>
                    Deleting Product will remove this and associated records completely, this
                    process is not reversible.
                </Alert>
            </Box>
            <Box className={classes.pt3}>
                <Button
                    variant={'contained'}
                    color={'error'}
                    onClick={() => {
                        dispatch(deleteProductAction(product._id))
                    }}
                >
                    Confirm Delete
                </Button>
            </Box>
        </Box>
    )
}

DeleteProduct.propTypes = {
    product: PropTypes.object,
}

export default DeleteProduct
