import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { deleteServiceAction } from 'redux/services/actions'
import { Alert, Box, Button, Divider, Grid, Typography } from '@mui/material'
import { MuiStyles } from 'theme'
import { BasicInfoGrid } from 'components/common'
import clsx from 'clsx'
import dayjs from 'dayjs'

const DeleteService = ({ service }) => {
    const dispatch = useDispatch()
    const classes = MuiStyles()
    return (
        <Box>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h5" color={'error'}>
                        Delete Service
                    </Typography>
                    <Typography variant={'subtitle1'}>{service.name || 'Service'}</Typography>
                </Grid>
            </Grid>

            <Box className={clsx(classes.pt3, classes.pb3)}>
                <Divider />
            </Box>

            <Box>
                <BasicInfoGrid
                    data={[
                        { title: 'Name', info: service.title },
                        { title: 'Description', info: service.description },
                        { title: 'Unit Price', info: service.unitPrice },
                        { title: 'Unit Measure', info: service.unit },
                        {
                            title: 'Created',
                            info: dayjs(service.created).format('DD MMM YYYY'),
                        },
                        {
                            title: 'Last Updated',
                            info: dayjs(service.updated).format('DD MMM YYYY'),
                        },
                    ]}
                />
            </Box>

            <Box className={classes.pt3}>
                <Alert severity={'warning'} color={'error'}>
                    Deleting Service will remove this and associated records completely, this
                    process is not reversible.
                </Alert>
            </Box>
            <Box className={classes.pt3}>
                <Button
                    variant={'contained'}
                    color={'error'}
                    onClick={() => {
                        dispatch(deleteServiceAction(service._id))
                    }}
                >
                    Confirm Delete
                </Button>
            </Box>
        </Box>
    )
}

DeleteService.propTypes = {
    service: PropTypes.object,
}

export default DeleteService
