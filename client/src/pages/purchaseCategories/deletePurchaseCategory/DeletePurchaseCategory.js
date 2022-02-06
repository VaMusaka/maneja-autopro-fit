import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { deletePurchaseCategoryAction } from 'redux/purchaseCategories/actions'
import { Alert, Box, Button, Divider, Grid, Typography } from '@mui/material'
import { MuiStyles } from 'theme'
import { BasicInfoGrid } from 'components/common'
import clsx from 'clsx'
import dayjs from 'dayjs'

const DeletePurchaseCategory = ({ purchaseCategory }) => {
    const dispatch = useDispatch()
    const classes = MuiStyles()
    return (
        <Box>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h5" color={'error'}>
                        Delete Purchase Category
                    </Typography>
                    <Typography variant={'subtitle1'}>
                        {purchaseCategory.name || 'Purchase Category'}
                    </Typography>
                </Grid>
            </Grid>

            <Box className={clsx(classes.pt3, classes.pb3)}>
                <Divider />
            </Box>

            <Box>
                <BasicInfoGrid
                    data={[
                        { title: 'Name', info: purchaseCategory.name },
                        { title: 'Description', info: purchaseCategory.description },
                        {
                            title: 'Created',
                            info: dayjs(purchaseCategory.created).format('DD MMM YYYY'),
                        },
                        {
                            title: 'Last Updated',
                            info: dayjs(purchaseCategory.updated).format('DD MMM YYYY'),
                        },
                    ]}
                />
            </Box>

            <Box className={classes.pt3}>
                <Alert severity={'warning'} color={'error'}>
                    Deleting Purchase Category will remove this and associated records completely,
                    this process is not reversible.
                </Alert>
            </Box>
            <Box className={classes.pt3}>
                <Button
                    variant={'contained'}
                    color={'error'}
                    onClick={() => {
                        dispatch(deletePurchaseCategoryAction(purchaseCategory._id))
                    }}
                >
                    Confirm Delete
                </Button>
            </Box>
        </Box>
    )
}

DeletePurchaseCategory.propTypes = {
    purchaseCategory: PropTypes.object,
}

export default DeletePurchaseCategory
