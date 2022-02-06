import React, { useEffect, useState } from 'react'
import { Box, Paper } from '@mui/material'
import DataTable from 'react-data-table-component'
import { useSelector, useDispatch } from 'react-redux'
import { servicesSelector } from 'redux/selectors'
import { getServicesAction, searchServicesAction } from 'redux/services/actions'
import { serviceTableColumns } from '../constants'
import { MuiDrawer, MuiSearchBar } from 'components/common'
import CreatePurchase from 'pages/services/createService'
import { isEmpty } from 'lodash'
import { MuiStyles } from 'theme'

const ServiceTable = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const dispatch = useDispatch()
    const { services, loading, layout } = useSelector(servicesSelector)
    const classes = MuiStyles()

    const getServices = () => dispatch(getServicesAction())

    useEffect(() => {
        getServices()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setDrawerOpen(layout?.openCreateDrawer)
    }, [layout?.openCreateDrawer])

    const handleSearch = (search) => {
        if (isEmpty(search)) {
            getServices()
        } else {
            dispatch(searchServicesAction({ search }))
        }
    }

    return (
        <Paper>
            <Box p={3}>
                <Box className={classes.pb2}>
                    <MuiSearchBar
                        placeholder={'Search'}
                        handleClear={getServices}
                        handleSearch={handleSearch}
                    />
                </Box>
                <DataTable
                    actions={[
                        <MuiDrawer
                            open={drawerOpen}
                            key={'create'}
                            openButtonText={'Create Service'}
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
                    title={'ALL SERVICES'}
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
                    columns={serviceTableColumns}
                    data={services || []}
                />
            </Box>
        </Paper>
    )
}

export default ServiceTable
