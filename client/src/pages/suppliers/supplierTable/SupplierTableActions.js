import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { MuiDrawer } from 'components/common'
import UpdateSupplier from '../updateSupplier/UpdateSupplier'
import ViewSupplier from '../viewSupplier'
import DeleteSupplier from '../deleteSupplier'

const SupplierTableActions = (supplier) => {
    return (
        <Box display={'flex'} flexDirection={'row'}>
            <MuiDrawer open={false} openButtonIcon={'Edit'} key={'update'}>
                <UpdateSupplier supplier={supplier} />
            </MuiDrawer>
            <MuiDrawer open={false} openButtonIcon={'FolderOpen'} key={'view'}>
                <ViewSupplier supplier={supplier} />
            </MuiDrawer>
            <MuiDrawer open={false} openButtonIcon={'Delete'} key={'delete'}>
                <DeleteSupplier supplier={supplier} />
            </MuiDrawer>
        </Box>
    )
}
SupplierTableActions.propTypes = {
    id: PropTypes.string.isRequired,
}

export default SupplierTableActions
