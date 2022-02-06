import React, { useEffect, useState } from 'react'
import { Box, Paper } from '@mui/material'
import DataTable from 'react-data-table-component'
import { useSelector, useDispatch } from 'react-redux'
import { usersSelector } from 'redux/selectors'
import { getUsersAction } from 'redux/users/actions'
import { userTableColumns } from '../constants'
import { MuiDrawer } from 'components/common'
import CreateUser from 'pages/users/createUser'
import { toggleCreateDrawer } from 'utils'

const UserTable = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const dispatch = useDispatch()
    const { users, loading, layout } = useSelector(usersSelector)

    const getUsers = () => dispatch(getUsersAction())

    useEffect(() => {
        getUsers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setDrawerOpen(layout.openCreateDrawer)
    }, [layout.openCreateDrawer])

    if (loading) {
        return ''
    }

    return (
        <Paper>
            <Box p={3}>
                <DataTable
                    open={drawerOpen}
                    actions={[
                        <MuiDrawer
                            key={'create'}
                            openButtonText={'Create User'}
                            open={drawerOpen}
                            handleOpen={() =>
                                toggleCreateDrawer(dispatch, layout, 'UPDATE_USERS_LAYOUT', true)
                            }
                            handleClose={() =>
                                toggleCreateDrawer(dispatch, layout, 'UPDATE_USERS_LAYOUT', false)
                            }
                        >
                            <CreateUser />
                        </MuiDrawer>,
                    ]}
                    title={'ALL USERS'}
                    fixedHeader
                    fixedHeaderScrollHeight="450px"
                    highlightOnHover
                    pagination
                    persistTableHead
                    responsive
                    striped
                    subHeaderAlign="right"
                    subHeaderWrap
                    progressPending={loading}
                    columns={userTableColumns}
                    data={users || []}
                />
            </Box>
        </Paper>
    )
}

export default UserTable
