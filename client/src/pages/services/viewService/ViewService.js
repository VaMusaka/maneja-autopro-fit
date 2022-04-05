import React from 'react'
import PropTypes from 'prop-types'
import { Box, Divider, Grid, Typography } from '@mui/material'
import { MuiStyles } from 'theme'
import { BasicInfoGrid } from 'components/common'
import dayjs from 'dayjs'

const ViewService = ({ service }) => {
    const classes = MuiStyles()
    return (
        <Box>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h5">{service.name || 'Service'}</Typography>
                </Grid>
            </Grid>

            <Box className={classes.pt3}>
                <Divider />
            </Box>

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
    )
}

ViewService.propTypes = {
    service: PropTypes.object.isRequired,
}

export default ViewService
