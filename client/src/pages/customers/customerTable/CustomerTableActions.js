import React from 'react'
import { Box } from '@mui/material'
import { MuiDrawer } from 'components/common'
import UpdateCustomer from '../updateCustomer/UpdateCustomer'
import ViewCustomer from '../viewCustomer'
import DeleteCustomer from '../deleteCustomer'

const CustomerTableActions = (customer) => {
    const drawerWidth = window.innerWidth > 1024 ? window.innerWidth - 320 : 620
    return (
        <Box display={'flex'} flexDirection={'row'}>
            <MuiDrawer open={false} key={'update'} openButtonIcon={'Edit'}>
                <UpdateCustomer customer={customer} />
            </MuiDrawer>

            <MuiDrawer open={false} key={'view'} openButtonIcon={'FolderOpen'} width={drawerWidth}>
                <ViewCustomer _id={customer._id} />
            </MuiDrawer>

            <MuiDrawer open={false} key={'delete'} openButtonIcon={'Delete'}>
                <DeleteCustomer customer={customer} />
            </MuiDrawer>
        </Box>
    )
}
CustomerTableActions.propTypes = {}

export default CustomerTableActions
