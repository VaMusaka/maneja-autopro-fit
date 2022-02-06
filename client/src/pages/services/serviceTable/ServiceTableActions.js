import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { MuiDrawer } from 'components/common'
import UpdateService from '../updateService'
import DeleteService from '../deleteService'
import ViewService from '../viewService'

const ServiceTableActions = (service) => {
    return (
        <Box display={'flex'} flexDirection={'row'}>
            <MuiDrawer open={false} key={'update'} openButtonIcon={'Edit'}>
                <UpdateService service={service} />
            </MuiDrawer>
            <MuiDrawer open={false} key={'view'} openButtonIcon={'FolderOpen'}>
                <ViewService service={service} />
            </MuiDrawer>
            <MuiDrawer open={false} key={'delete'} openButtonIcon={'Delete'}>
                <DeleteService service={service} />
            </MuiDrawer>
        </Box>
    )
}
ServiceTableActions.propTypes = {
    id: PropTypes.string.isRequired,
}

export default ServiceTableActions
