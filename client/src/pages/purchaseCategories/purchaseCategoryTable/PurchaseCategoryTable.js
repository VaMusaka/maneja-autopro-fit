import React, { useEffect, useState } from 'react'
import { Box, Paper } from '@mui/material'
import DataTable from 'react-data-table-component'
import { useSelector, useDispatch } from 'react-redux'
import { purchaseCategoriesSelector } from 'redux/selectors'
import {
    getPurchaseCategoriesAction,
    searchPurchaseCategoriesAction,
} from 'redux/purchaseCategories/actions'
import { purchaseTableColumns } from '../constants'
import { MuiDrawer, MuiSearchBar } from 'components/common'
import CreatePurchase from 'pages/purchaseCategories/createPurchaseCategory'
import { isEmpty } from 'lodash'
import { MuiStyles } from 'theme'

const PurchaseCategoryTable = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const dispatch = useDispatch()
    const { purchaseCategories, loading, layout } = useSelector(purchaseCategoriesSelector)
    const classes = MuiStyles()

    const getPurchaseCategories = () => dispatch(getPurchaseCategoriesAction())

    useEffect(() => {
        getPurchaseCategories()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setDrawerOpen(layout?.openCreateDrawer)
    }, [layout?.openCreateDrawer])

    const handleSearch = (search) => {
        if (isEmpty(search)) {
            getPurchaseCategories()
        } else {
            dispatch(searchPurchaseCategoriesAction({ search }))
        }
    }

    return (
        <Paper>
            <Box p={3}>
                <Box className={classes.pb2}>
                    <MuiSearchBar
                        placeholder={'Search'}
                        handleClear={getPurchaseCategories}
                        handleSearch={handleSearch}
                    />
                </Box>
                {!loading && (
                    <DataTable
                        actions={[
                            <MuiDrawer
                                open={drawerOpen}
                                key={'create'}
                                openButtonText={'Create Purchase Category'}
                                handleOpen={() =>
                                    dispatch({
                                        type: 'UPDATE_PURCHASE_CATEGORY_LAYOUT',
                                        payload: { ...layout, openCreateDrawer: true },
                                    })
                                }
                                handleClose={() =>
                                    dispatch({
                                        type: 'UPDATE_PURCHASE_CATEGORY_LAYOUT',
                                        payload: { ...layout, openCreateDrawer: false },
                                    })
                                }
                            >
                                <CreatePurchase />
                            </MuiDrawer>,
                        ]}
                        title={'ALL PURCHASES CATEGORIES'}
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
                        columns={purchaseTableColumns}
                        data={purchaseCategories || []}
                    />
                )}
            </Box>
        </Paper>
    )
}

export default PurchaseCategoryTable
