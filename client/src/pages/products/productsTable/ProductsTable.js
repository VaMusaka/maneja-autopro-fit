import React, { useEffect, useState } from 'react'
import { Box, Paper } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsAction, searchProductsAction } from 'redux/products/actions'
import { productsSelector } from 'redux/selectors'
import DataTable from 'react-data-table-component'
import { MuiDrawer, MuiSearchBar } from 'components/common'
import CreateProduct from 'pages/products/createProduct'
import { productsTableColumns } from 'pages/products/constants'
import { isEmpty } from 'lodash'
import { MuiStyles } from 'theme'

const ProductsTable = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const dispatch = useDispatch()
    const classes = MuiStyles()
    const { products, loading, layout } = useSelector(productsSelector)

    useEffect(() => {
        dispatch(getProductsAction())
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setDrawerOpen(layout?.openCreateDrawer)
    }, [layout?.openCreateDrawer])

    if (loading) {
        return 'Loading'
    }

    const handleClearSearch = () => {
        dispatch(getProductsAction())
    }

    const handleSearch = (search) => {
        if (isEmpty(search)) {
            handleClearSearch()
        } else {
            dispatch(searchProductsAction({ search }))
        }
    }

    return (
        <Paper>
            <Box p={3}>
                <Box className={classes.pb2}>
                    <MuiSearchBar
                        placeholder={'Search'}
                        handleClear={handleClearSearch}
                        handleSearch={handleSearch}
                    />
                </Box>
                <DataTable
                    actions={[
                        <MuiDrawer
                            open={drawerOpen}
                            key={'create'}
                            openButtonText={'Create Product'}
                            handleOpen={() =>
                                dispatch({
                                    type: 'UPDATE_PRODUCT_LAYOUT',
                                    payload: { ...layout, openCreateDrawer: true },
                                })
                            }
                            handleClose={() =>
                                dispatch({
                                    type: 'UPDATE_PRODUCT_LAYOUT',
                                    payload: { ...layout, openCreateDrawer: false },
                                })
                            }
                        >
                            <CreateProduct />
                        </MuiDrawer>,
                    ]}
                    title={'PRODUCTS'}
                    fixedHeader
                    fixedHeaderScrollHeight="90vh"
                    highlightOnHover
                    pagination
                    persistTableHead
                    responsive
                    striped
                    progressPending={loading}
                    subHeaderAlign="right"
                    subHeaderWrap
                    columns={productsTableColumns}
                    data={products || []}
                />
            </Box>
        </Paper>
    )
}

export default ProductsTable
