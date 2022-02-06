import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { MuiDrawer } from 'components/common'
import UpdateProduct from 'pages/products/updateProduct'
import ViewProduct from 'pages/products/viewProduct'
import DeleteProduct from 'pages/products/deleteProduct'
import ProductPurchases from '../productPurchases'

const ProductsTableActions = (product) => {
    const drawerWidth = window.innerWidth > 1024 ? window.innerWidth - 305 : 620

    return (
        <Box display={'flex'} flexDirection={'row'}>
            <MuiDrawer open={false} key={'update'} openButtonIcon={'Edit'}>
                <UpdateProduct product={product} />
            </MuiDrawer>
            <MuiDrawer open={false} key={'view'} openButtonIcon={'FolderOpen'}>
                <ViewProduct product={product} />
            </MuiDrawer>
            <MuiDrawer
                open={false}
                key={'purchases'}
                openButtonIcon={'ShoppingBasket'}
                width={drawerWidth}
            >
                <ProductPurchases product={product} />
            </MuiDrawer>
            <MuiDrawer open={false} key={'delete'} openButtonIcon={'Delete'}>
                <DeleteProduct product={product} />
            </MuiDrawer>
        </Box>
    )
}

ProductsTableActions.propTypes = {
    product: PropTypes.object.isRequired,
}

export default ProductsTableActions
