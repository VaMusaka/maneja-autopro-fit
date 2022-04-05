import React, { useEffect, useState } from 'react'
import { Box, Paper, Grid } from '@mui/material'
import DataTable from 'react-data-table-component'
import { useSelector, useDispatch } from 'react-redux'
import { quotesSelector } from 'redux/selectors'
import { getQuotesAction, searchQuoteAction } from 'redux/quotes/actions'
import { quoteTableColumns, conditionalRowStyles } from '../constants'
import { MuiDrawer, MuiSearchBar } from 'components/common'
import CreateQuote from 'pages/quotes/createQuote'
import { toggleCreateDrawer } from 'utils'
import QuoteTableExpandableRow from './QuoteTableExpandableRow'
import { MuiStyles } from 'theme'
import { isEmpty } from 'lodash'

const QuoteTable = () => {
    const [tableTitle, setTableTitle] = useState(`QUOTES`)
    const classes = MuiStyles()
    const [drawerOpen, setDrawerOpen] = useState(false)
    const dispatch = useDispatch()
    const { quotes, loading, layout } = useSelector(quotesSelector)

    const getQuotes = () => dispatch(getQuotesAction())

    useEffect(() => {
        getQuotes()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setDrawerOpen(layout.openCreateDrawer)
    }, [layout.openCreateDrawer])

    const handleClearSearch = () => {
        dispatch(getQuotesAction())
        setTableTitle('QUOTES')
    }

    const handleQuoteSearch = (search) => {
        if (isEmpty(search)) {
            handleClearSearch()
        } else {
            dispatch(searchQuoteAction({ search }))
            setTableTitle('SEARCH RESULTS')
        }
    }

    return (
        <Paper>
            <Box p={3}>
                <Box className={classes.pb2}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12}>
                            <Box width={'100%'}>
                                <MuiSearchBar
                                    placeholder={'Search Quote # | Vehicle Model - Reg'}
                                    handleClear={handleClearSearch}
                                    handleSearch={handleQuoteSearch}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <DataTable
                    actions={[
                        <MuiDrawer
                            key={'create'}
                            openButtonText={'Create Quote'}
                            open={drawerOpen}
                            handleOpen={() =>
                                toggleCreateDrawer(dispatch, layout, 'UPDATE_QUOTES_LAYOUT', true)
                            }
                            handleClose={() =>
                                toggleCreateDrawer(dispatch, layout, 'UPDATE_QUOTES_LAYOUT', false)
                            }
                        >
                            <CreateQuote />
                        </MuiDrawer>,
                    ]}
                    title={tableTitle}
                    progressPending={loading}
                    fixedHeader
                    fixedHeaderScrollHeight="90vh"
                    highlightOnHover
                    expandableRows
                    pagination
                    expandableRowsComponent={QuoteTableExpandableRow}
                    persistTableHead
                    responsive
                    striped
                    subHeaderAlign="left"
                    subHeaderWrap
                    columns={quoteTableColumns}
                    conditionalRowStyles={conditionalRowStyles}
                    data={quotes || []}
                />
            </Box>
        </Paper>
    )
}

export default QuoteTable
