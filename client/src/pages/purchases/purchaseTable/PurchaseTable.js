import React, { useEffect } from 'react'
import { Box, Paper } from '@mui/material'
import DataTable from 'react-data-table-component'
import { useSelector, useDispatch } from 'react-redux'
import { purchasesSelector } from 'redux/selectors'
import { getPurchasesAction, searchPurchasesAction } from 'redux/purchases/actions'
import { purchaseTableColumns } from '../constants'
import PurchaseTableExpandableRow from './PurchaseTableExpandableRow'
import { MuiSearchBar } from 'components/common'
import { isEmpty } from 'lodash'
import { MuiStyles } from 'theme'

const PurchaseTable = () => {
    const dispatch = useDispatch()
    const { purchases, loading } = useSelector(purchasesSelector)
    const classes = MuiStyles()
    const getPurchases = () => dispatch(getPurchasesAction())

    useEffect(() => {
        getPurchases()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSearch = (search) => {
        if (isEmpty(search)) {
            getPurchases()
        } else {
            dispatch(searchPurchasesAction({ search }))
        }
    }

    return (
        <Paper>
            <Box p={3}>
                <Box className={classes.pb2}>
                    <MuiSearchBar
                        placeholder={'Search'}
                        handleClear={getPurchasesAction}
                        handleSearch={handleSearch}
                    />
                </Box>
                <DataTable
                    title={'ALL PURCHASES'}
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
                    columns={purchaseTableColumns}
                    expandableRows
                    expandableRowsComponent={PurchaseTableExpandableRow}
                    data={purchases || []}
                />
            </Box>
        </Paper>
    )
}

export default PurchaseTable
