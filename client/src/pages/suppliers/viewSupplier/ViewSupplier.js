import React from 'react'
import PropTypes from 'prop-types'
import { Box, Divider, Grid, Typography } from '@mui/material'
import { MuiStyles } from 'theme'
import { BasicInfoGrid } from 'components/common'
import dayjs from 'dayjs'

const ViewSupplier = ({ supplier }) => {
    const classes = MuiStyles()
    return (
        <Box>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h5">{supplier.name || 'Supplier'}</Typography>
                </Grid>
            </Grid>

            <Box className={classes.pt3}>
                <Divider />
            </Box>

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
    )
}

ViewSupplier.propTypes = {
    supplier: PropTypes.object.isRequired,
}

export default ViewSupplier
