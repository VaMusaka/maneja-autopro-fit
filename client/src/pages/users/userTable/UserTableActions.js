import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { MuiDrawer } from 'components/common'
import UpdateUser from '../updateUser/UpdateUser'
import ViewUser from '../viewUser'
import DeleteUser from '../deleteUser'

const UserTableActions = (user) => {
    return (
        <Box display={'flex'} flexDirection={'row'}>
            <MuiDrawer open={false} key={'update'} openButtonIcon={'Edit'}>
                <UpdateUser user={user} />
            </MuiDrawer>
            <MuiDrawer open={false} key={'view'} openButtonIcon={'FolderOpen'}>
                <ViewUser user={user} />
            </MuiDrawer>
            <MuiDrawer open={false} key={'delete'} openButtonIcon={'Delete'}>
                <DeleteUser user={user} />
            </MuiDrawer>
        </Box>
    )
}
UserTableActions.propTypes = {
    id: PropTypes.string.isRequired,
}

export default UserTableActions
