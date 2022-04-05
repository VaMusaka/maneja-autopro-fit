import React, { useEffect, useState } from 'react'
import { Box, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material'
import DataTable from 'react-data-table-component'
import { useSelector, useDispatch } from 'react-redux'
import { transactionsSelector } from 'redux/selectors'
import { getTransactionsAction } from 'redux/transactions/actions'
import { purchaseTableColumns } from '../constants'
import { MuiDrawer } from 'components/common'
import CreatePurchase from 'pages/transactions/createTransaction'
import { companyDetails } from 'config'

const TransactionTable = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [transactionsDepartment, setTransactionsDepartment] = useState('all')

    const dispatch = useDispatch()
    const { transactions, loading, layout } = useSelector(transactionsSelector)

    const getTransactions = () => dispatch(getTransactionsAction())

    useEffect(() => {
        getTransactions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setDrawerOpen(layout?.openCreateDrawer)
    }, [layout?.openCreateDrawer])

    const handleTransactionsFilter = (e, value) => {
        setTransactionsDepartment(value)
        if (value === 'all') {
            return dispatch(getTransactionsAction())
        }

        return dispatch(getTransactionsAction({ department: value }))
    }

    if (loading) {
        return ''
    }

    return (
        <Paper>
            <Box p={3}>
                <DataTable
                    actions={[
                        <ToggleButtonGroup
                            key={'Search'}
                            onChange={handleTransactionsFilter}
                            fullWidth
                            exclusive
                            size={'small'}
                            value={transactionsDepartment}
                        >
                            <ToggleButton value={'all'}>ALL</ToggleButton>
                            {companyDetails.departments.map(({ name }) => (
                                <ToggleButton key={name} value={name}>
                                    {name}
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>,

                        <MuiDrawer
                            open={drawerOpen}
                            key={'create'}
                            openButtonText={'Create '}
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
                    title={'ALL TRANSACTIONS'}
                    fixedHeader
                    fixedHeaderScrollHeight="90vh"
                    highlightOnHover
                    pagination
                    persistTableHead
                    responsive
                    striped
                    // progressPending={loading}
                    subHeaderAlign="right"
                    subHeaderWrap
                    columns={purchaseTableColumns}
                    data={transactions || []}
                />
            </Box>
        </Paper>
    )
}

export default TransactionTable
