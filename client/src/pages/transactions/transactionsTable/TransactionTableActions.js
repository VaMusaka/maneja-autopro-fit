import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { MuiDrawer } from 'components/common'
import UpdateTransaction from '../updateTransaction/UpdateTransaction'
import DeleteTransaction from '../deleteTransaction'
import ViewTransaction from '../viewTransaction'

const TransactionTableActions = (transaction) => {
    return (
        <Box display={'flex'} flexDirection={'row'}>
            <MuiDrawer open={false} key={'update'} openButtonIcon={'Edit'}>
                <UpdateTransaction transaction={transaction} />
            </MuiDrawer>
            <MuiDrawer open={false} key={'view'} openButtonIcon={'FolderOpen'}>
                <ViewTransaction transaction={transaction} />
            </MuiDrawer>
            <MuiDrawer open={false} key={'delete'} openButtonIcon={'Delete'}>
                <DeleteTransaction transaction={transaction} />
            </MuiDrawer>
        </Box>
    )
}
TransactionTableActions.propTypes = {
    transaction: PropTypes.object.isRequired,
}

export default TransactionTableActions
