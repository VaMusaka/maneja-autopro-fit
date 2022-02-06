import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as dsActions from 'redux/dataServices/actions'
import { dataServiceSelector } from 'redux/selectors'
import DefaultLayout from 'components/layout/default'
import { Box } from '@mui/material'
import KpiRow from './kpiRow'
import { MuiStyles } from 'theme'
import InvoiceChartsRow from './invoiceChartsRow/InvoiceChartsRow'
import PurchaseChartsRow from './purchaseChartsRow'

const Home = () => {
    const classes = MuiStyles()
    const dispatch = useDispatch()
    const DATA_SERVICES = useSelector(dataServiceSelector)
    const { loading } = DATA_SERVICES

    useEffect(() => {
        /// DATA SERVICE ACTIONS
        dispatch(dsActions.getCustomerStatsAction())
        dispatch(dsActions.getInvoiceStatsAction())
        dispatch(dsActions.getSupplierStatsAction())
        dispatch(dsActions.getServicesStatsAction())
        dispatch(dsActions.getPurchaseStats())

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading) {
        return 'LOADING'
    }

    return (
        <DefaultLayout title={'Dashboard'}>
            <Box className={classes.pb2}>
                <KpiRow />
            </Box>
            <Box className={classes.pb2}>
                <InvoiceChartsRow />
            </Box>
            <Box className={classes.pb2}>
                <PurchaseChartsRow />
            </Box>
        </DefaultLayout>
    )
}

export default Home
