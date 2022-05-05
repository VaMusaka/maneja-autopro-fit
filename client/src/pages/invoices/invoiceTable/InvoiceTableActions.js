import React from 'react'
import PropTypes from 'prop-types'
import { Box, IconButton } from '@mui/material'
import { MuiDrawer, MuiIcon } from 'components/common'
import DeleteInvoice from '../deleteInvoice'
import UpdateInvoice from '../updateInvoice/UpdateInvoice'
import { openTab } from 'utils'

const InvoiceTableActions = ({ invoice }) => {
    return (
        <Box display={'flex'} flexDirection={'space-between'}>
            <MuiDrawer openButtonIcon={'Edit'} open={false}>
                <UpdateInvoice invoice={invoice} />
            </MuiDrawer>
            <IconButton size="small" onClick={() => openTab(`/#/invoices/${invoice._id}/view`)}>
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
