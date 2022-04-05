import React, { useEffect, useState } from 'react'
import { Box, Paper } from '@mui/material'
import DataTable from 'react-data-table-component'
import { useSelector, useDispatch } from 'react-redux'
import { customersSelector } from 'redux/selectors'
import { getCustomersAction, searchCustomersAction } from 'redux/customers/actions'
import { customerTableColumns, conditionalRowStyles } from '../constants'
import { MuiDrawer, MuiSearchBar } from 'components/common'
import CreateCustomer from 'pages/customers/createCustomer'
import { toggleCreateDrawer } from 'utils'
import { MuiStyles } from 'theme'
import { isEmpty } from 'lodash'

const CustomerTable = () => {
    const [tableTitle, setTableTitle] = useState('ALL CUSTOMERS')
    const [drawerOpen, setDrawerOpen] = useState(false)
    const dispatch = useDispatch()
    const classes = MuiStyles()
    const { customers, layout, loading } = useSelector(customersSelector)
    const getCustomers = () => dispatch(getCustomersAction())

    useEffect(() => {
        getCustomers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setDrawerOpen(layout.openCreateDrawer)
    }, [layout.openCreateDrawer])

    const handleClearSearch = () => {
        dispatch(getCustomersAction())
        setTableTitle('ALL CUSTOMERS')
    }

    const handleCustomerSearch = (search) => {
        if (isEmpty(search)) {
            handleClearSearch()
        } else {
            dispatch(searchCustomersAction({ search }))
            setTableTitle('SEARCH RESULTS')
        }
    }

    return (
        <Paper>
            <Box p={3}>
                <Box className={classes.pb2}>
                    <MuiSearchBar
                        placeholder={'Search Customers'}
                        handleClear={handleClearSearch}
                        handleSearch={handleCustomerSearch}
                    />
                </Box>
                <DataTable
                    actions={[
                        <MuiDrawer
                            open={drawerOpen}
                            key={'create'}
                            openButtonText={'Create Customer'}
                            handleOpen={() =>
                                toggleCreateDrawer(dispatch, layout, 'UPDATE_CUSTOMER_LAYOUT', true)
                            }
                            handleClose={() =>
                                toggleCreateDrawer(
                                    dispatch,
                                    layout,
                                    'UPDATE_CUSTOMER_LAYOUT',
                                    false
                                )
                            }
                        >
                            <CreateCustomer />
                        </MuiDrawer>,
                    ]}
                    title={tableTitle}
                    fixedHeader
                    fixedHeaderScrollHeight="80vh"
                    paginationPerPage={10}
                    highlightOnHover
                    pagination
                    persistTableHead
                    responsive
                    striped
                    subHeaderAlign="right"
                    subHeaderWrap
                    progressPending={loading && !customers}
                    columns={customerTableColumns}
                    conditionalRowStyles={conditionalRowStyles}
                    data={customers || []}
                />
            </Box>
        </Paper>
    )
}

export default CustomerTable
