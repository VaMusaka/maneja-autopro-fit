import React from 'react'
import PropTypes from 'prop-types'
import { Box, IconButton, Tooltip } from '@mui/material'
import { MuiDrawer, MuiIcon } from 'components/common'
import UpdatePurchase from '../updatePurchase/UpdatePurchase'
import ViewPurchase from '../viewPurchase'
import DeletePurchase from '../deletePurchase'
import { useRouteMatch } from 'react-router-dom'
import { openTab } from 'utils'
import ViewProduct from 'pages/products/viewProduct'

const PurchaseTableActions = ({ purchase }) => {
    const match = useRouteMatch()

    return (
        <Box display={'flex'} flexDirection={'row'}>
            {match.path === '/purchases' && purchase?.invoice && (
                <Tooltip title={'View Invoice'}>
                    <IconButton onClick={() => openTab(`/#/invoices/${purchase.invoice._id}/view`)}>
                        <MuiIcon name={'Receipt'} />
                    </IconButton>
                </Tooltip>
            )}
            {purchase?.product && (
                <MuiDrawer openButtonIcon={'ProductionQuantityLimits'} key={'Product'} open={false}>
                    <ViewProduct product={purchase.product} />
                </MuiDrawer>
            )}
            <MuiDrawer openButtonIcon={'Edit'} open={false} tooltip={'Edit'}>
                <UpdatePurchase purchase={purchase} />
            </MuiDrawer>
            <MuiDrawer openButtonIcon={'FolderOpen'} open={false} tooltip={'View'}>
                <ViewPurchase purchase={purchase} />
            </MuiDrawer>

            <MuiDrawer openButtonIcon={'Delete'} open={false} tooltip={'Delete'}>
                <DeletePurchase purchase={purchase} />
            </MuiDrawer>
        </Box>
    )
}
PurchaseTableActions.propTypes = {
    purchase: PropTypes.object.isRequired,
}

export default PurchaseTableActions
