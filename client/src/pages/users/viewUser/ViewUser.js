import React from 'react'
import PropTypes from 'prop-types'
import { Box, Divider, Grid, Typography } from '@mui/material'
import { MuiStyles } from 'theme'
import { BasicInfoGrid } from 'components/common'
import dayjs from 'dayjs'

const ViewUser = ({ user }) => {
    const classes = MuiStyles()
    return (
        <Box>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h5">{user.name || 'User'}</Typography>
                </Grid>
            </Grid>

            <Box className={classes.pt3}>
                <Divider />
            </Box>

            <BasicInfoGrid
                data={[
                    { title: 'Name', info: user.name },
                    { title: 'Role', info: user.role },
                    { title: 'Email', info: user.email },
                    { title: 'Email Verified', info: user.emailVerified ? 'Yes' : 'No' },
                    { title: 'Status', info: user.active ? 'Active' : 'In Active' },
                    {
                        title: 'Created',
                        info: dayjs(user.created).format('DD MMM YYYY'),
                    },
                    {
                        title: 'Last Updated',
                        info: dayjs(user.updated).format('DD MMM YYYY'),
                    },
                ]}
            />
        </Box>
    )
}

ViewUser.propTypes = {
    user: PropTypes.object.isRequired,
}

export default ViewUser
