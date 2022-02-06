import React from 'react'
import PropTypes from 'prop-types'
import { useRouteMatch } from 'react-router-dom'
import { Box, IconButton } from '@mui/material'
import { MuiDrawer, MuiIcon } from 'components/common'
import DeleteInvoice from '../deleteInvoice'
import UpdateInvoice from '../updateInvoice/UpdateInvoice'
import { openTab } from 'utils'

const InvoiceTableActions = ({ invoice }) => {
    const { url } = useRouteMatch()
    return (
        <Box display={'flex'} flexDirection={'space-between'}>
            <MuiDrawer openButtonIcon={'Edit'} open={false}>
                <UpdateInvoice invoice={invoice} />
            </MuiDrawer>
            <IconButton size="small" onClick={() => openTab(`/#${url}/${invoice._id}/view`)}>
                <MuiIcon size="small" color="primary" name={'FolderOpen'} />
            </IconButton>
            <MuiDrawer openButtonIcon={'Delete'} open={false}>
                <DeleteInvoice invoice={invoice} />
            </MuiDrawer>
        </Box>
    )
}
InvoiceTableActions.propTypes = {
    invoice: PropTypes.object.isRequired,
}

export default InvoiceTableActions
