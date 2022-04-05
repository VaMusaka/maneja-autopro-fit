import React, { useEffect, useState } from 'react'
import { Box, Paper } from '@mui/material'
import DataTable from 'react-data-table-component'
import { useSelector, useDispatch } from 'react-redux'
import { suppliersSelector } from 'redux/selectors'
import { getSuppliersAction, searchSuppliersAction } from 'redux/suppliers/actions'
import { supplierTableColumns } from '../constants'
import { MuiDrawer, MuiSearchBar } from 'components/common'
import CreateSupplier from 'pages/suppliers/createSupplier'
import { toggleCreateDrawer } from 'utils'
import { isEmpty } from 'lodash'
import { MuiStyles } from 'theme'

const SupplierTable = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const dispatch = useDispatch()
    const classes = MuiStyles()
    const { suppliers, loading, layout } = useSelector(suppliersSelector)

    const getSuppliers = () => dispatch(getSuppliersAction())

    useEffect(() => {
        getSuppliers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setDrawerOpen(layout.openCreateDrawer)
    }, [layout.openCreateDrawer])

    const handleSearch = (search) => {
        if (isEmpty(search)) {
            getSuppliers()
        } else {
            dispatch(searchSuppliersAction({ search }))
        }
    }

    return (
        <Paper>
            <Box p={3}>
                <Box className={classes.pb2}>
                    <MuiSearchBar
                        placeholder={'Search'}
                        handleCler={getSuppliers}
                        handleSearch={handleSearch}
                    />
                </Box>
                <DataTable
                    actions={[
                        <MuiDrawer
                            key={'create'}
                            openButtonText={'Create Supplier'}
                            open={drawerOpen}
                            handleOpen={() =>
                                toggleCreateDrawer(
                                    dispatch,
                                    layout,
                                    'UPDATE_SUPPLIERS_LAYOUT',
                                    true
                                )
                            }
                            handleClose={() =>
                                toggleCreateDrawer(
                                    dispatch,
                                    layout,
                                    'UPDATE_SUPPLIERS_LAYOUT',
                                    false
                                )
                            }
                        >
                            <CreateSupplier />
                        </MuiDrawer>,
                    ]}
                    title={'ALL SUPPLIERS'}
                    progressPending={loading}
                    fixedHeader
                    fixedHeaderScrollHeight="90vh"
                    highlightOnHover
                    pagination
                    persistTableHead
                    responsive
                    striped
                    subHeaderAlign="right"
                    subHeaderWrap
                    columns={supplierTableColumns}
                    data={suppliers || []}
                />
            </Box>
        </Paper>
    )
}

export default SupplierTable
