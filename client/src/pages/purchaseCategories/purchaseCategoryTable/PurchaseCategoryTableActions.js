import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { MuiDrawer } from 'components/common'
import UpdatePurchaseCategory from '../updatePurchaseCategory/UpdatePurchaseCategory'
import DeletePurchaseCategory from '../deletePurchaseCategory'
import ViewPurchaseCategory from '../viewPurchaseCategory'

const PurchaseCategoryTableActions = (purchaseCategory) => {
    return (
        <Box display={'flex'} flexDirection={'row'}>
            <MuiDrawer open={false} key={'update'} openButtonIcon={'Edit'}>
                <UpdatePurchaseCategory purchaseCategory={purchaseCategory} />
            </MuiDrawer>
            <MuiDrawer open={false} key={'view'} openButtonIcon={'FolderOpen'}>
                <ViewPurchaseCategory purchaseCategory={purchaseCategory} />
            </MuiDrawer>
            <MuiDrawer open={false} key={'delete'} openButtonIcon={'Delete'}>
                <DeletePurchaseCategory purchaseCategory={purchaseCategory} />
            </MuiDrawer>
        </Box>
    )
}
PurchaseCategoryTableActions.propTypes = {
    purchaseCategory: PropTypes.object.isRequired,
}

export default PurchaseCategoryTableActions
