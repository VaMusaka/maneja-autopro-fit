import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { deleteSupplierAction } from 'redux/suppliers/actions'
import { Alert, Box, Button, Divider, Grid, Typography } from '@mui/material'
import { MuiStyles } from 'theme'
import { BasicInfoGrid } from 'components/common'
import clsx from 'clsx'
import dayjs from 'dayjs'

const DeleteSupplier = ({ supplier }) => {
    const dispatch = useDispatch()
    const classes = MuiStyles()
    return (
        <Box>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h5" color={'error'}>
                        Delete Supplier
                    </Typography>
                    <Typography variant={'subtitle1'}>{supplier.name || 'Supplier'}</Typography>
                </Grid>
            </Grid>

            <Box className={clsx(classes.pt3, classes.pb3)}>
                <Divider />
            </Box>

            <Box>
                <BasicInfoGrid
                    data={[
                        { title: 'Name', info: supplier.name },
                        { title: 'Location', info: supplier.town },
                        { title: 'Phone', info: supplier.phone },
                        { title: 'email', info: supplier.email },
                        {
                            title: 'Created',
                            info: dayjs(supplier.created).format('DD MMM YYYY'),
                        },
                        {
                            title: 'Last Updated',
                            info: dayjs(supplier.updated).format('DD MMM YYYY'),
                        },
                    ]}
                />
            </Box>

            <Box className={classes.pt3}>
                <Alert severity={'warning'} color={'error'}>
                    Deleting Supplier will remove this and associated records completely, this
                    process is not reversible.
                </Alert>
            </Box>
            <Box className={classes.pt3}>
                <Button
                    variant={'contained'}
                    color={'error'}
                    onClick={() => {
                        dispatch(deleteSupplierAction(supplier._id))
                    }}
                >
                    Confirm Delete
                </Button>
            </Box>
        </Box>
    )
}

DeleteSupplier.propTypes = {
    supplier: PropTypes.object,
}

export default DeleteSupplier
