import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { deletePurchaseAction } from 'redux/purchases/actions'
import { Alert, Box, Button, Divider, Grid, Typography } from '@mui/material'
import { MuiStyles } from 'theme'
import { BasicInfoGrid } from 'components/common'
import clsx from 'clsx'
import dayjs from 'dayjs'

const DeletePurchase = ({ purchase }) => {
    const dispatch = useDispatch()
    const classes = MuiStyles()
    return (
        <Box>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h5" color={'error'}>
                        Delete Purchase
                    </Typography>
                    <Typography variant={'subtitle1'}>
                        {purchase.name || 'Purchase Category'}
                    </Typography>
                </Grid>
            </Grid>

            <Box className={clsx(classes.pt3, classes.pb3)}>
                <Divider />
            </Box>

            <Box>
                <BasicInfoGrid
                    data={[
                        { title: 'Invoiced TO', info: purchase.name },
                        { title: 'PDF Name', info: purchase?.pdfName },
                        { title: 'PDF Number', info: purchase?.pdfPageNumber },
                        { title: 'Invoice #', info: purchase?.invoice?.autoId },
                        { title: 'Description', info: purchase.details },
                        { title: 'Supplier', info: purchase.supplier.name },
                        { title: 'Purchase Category', info: purchase.purchaseCategory.name },

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

            <Box className={classes.pt3}>
                <Alert severity={'warning'} color={'error'}>
                    Deleting Purchase will remove this and associated records completely, this
                    process is not reversible.
                </Alert>
            </Box>
            <Box className={classes.pt3}>
                <Button
                    variant={'contained'}
                    color={'error'}
                    onClick={() => {
                        dispatch(deletePurchaseAction(purchase._id))
                    }}
                >
                    Confirm Delete
                </Button>
            </Box>
        </Box>
    )
}

DeletePurchase.propTypes = {
    purchase: PropTypes.object,
}

export default DeletePurchase
