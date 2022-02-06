import {
    getInvoicesCount,
    getInvoicesTotal,
    getCustomersCount,
    getCustomersCountByType,
    getInvoiceStatsByMonth,
    getInvoiceStatsByYear,
    getInvoiceStatsByTopCustomers,
    getSuppliersCount,
    getServicesCount,

    //purchases
    getPurchasesCount,
    getPurchasesTotal,
    getPurchasesByMonth,
    getPurchasesByYear,
    getPurchasesByCategory,
    getPurchasesBySupplier,
    getInvoicesUnPaidTotal,
} from 'api/dataService'
import { toast } from 'react-toastify'

import {
    DS_UPDATE_INVOICE_STATS,
    DS_UPDATE_CUSTOMER_STATS,
    DS_UPDATE_SUPPLIER_STATS,
    DS_UPDATE_SERVICE_STATS,
    DS_UPDATE_PURCHASES_STATS,
    DATA_SERVICE_LOADING,
    DATA_SERVICE_ERRORS,
} from './types'

export const setDataServiceLoadingAction = () => (dispatch) => {
    dispatch({ type: DATA_SERVICE_LOADING, payload: true })
}

export const setDataServicesErrorAction = (errors) => (dispatch) => {
    dispatch({ type: DATA_SERVICE_ERRORS, payload: errors })
}

export const getCustomerStatsAction = () => async (dispatch, getState) => {
    dispatch(setDataServiceLoadingAction())
    try {
        const count = await getCustomersCount()
        const countByType = await getCustomersCountByType()
        const { customers } = getState().DATA_SERVICES

        dispatch({
            type: DS_UPDATE_CUSTOMER_STATS,
            payload: { ...customers, count: count.data, countByType: countByType.data },
        })
    } catch (errors) {
        toast.error('Error Loading Customer Stats')
        dispatch(setDataServicesErrorAction(errors))
    }
}

export const getInvoiceStatsAction = () => async (dispatch, getState) => {
    dispatch(setDataServiceLoadingAction())
    let count, total, byMonth, byYear, topByCustomers, unPaidTotal
    try {
        count = await getInvoicesCount()
        total = await getInvoicesTotal()
        unPaidTotal = await getInvoicesUnPaidTotal()
        byMonth = await getInvoiceStatsByMonth()
        byYear = await getInvoiceStatsByYear()
        topByCustomers = await getInvoiceStatsByTopCustomers()

        const { invoices } = getState().DATA_SERVICES

        dispatch({
            type: DS_UPDATE_INVOICE_STATS,
            payload: {
                ...invoices,
                count: count?.data,
                total: total.data,
                byMonth: byMonth.data,
                byYear: byYear.data,
                unPaidTotal: unPaidTotal.data,
                topByCustomers: topByCustomers.data,
            },
        })
    } catch (errors) {
        toast.error('Error Loading Invoice Stats')
        dispatch(setDataServicesErrorAction(errors))
    }
}

export const getSupplierStatsAction = () => async (dispatch, getState) => {
    dispatch(setDataServiceLoadingAction())
    try {
        const count = await getSuppliersCount()
        const { suppliers } = getState().DATA_SERVICES
        dispatch({
            type: DS_UPDATE_SUPPLIER_STATS,
            payload: { ...suppliers, count: count.data },
        })
    } catch (errors) {
        toast.error('Error Loading Invoice Stats')
        dispatch(setDataServicesErrorAction(errors))
    }
}

export const getServicesStatsAction = () => async (dispatch, getState) => {
    dispatch(setDataServiceLoadingAction())
    try {
        const count = await getServicesCount()
        const { services } = getState().DATA_SERVICES

        dispatch({
            type: DS_UPDATE_SERVICE_STATS,
            payload: { ...services, count: count.data },
        })
    } catch (errors) {
        toast.error('Error Loading Invoice Stats')
        dispatch(setDataServicesErrorAction(errors))
    }
}

export const getPurchaseStats = () => async (dispatch, getState) => {
    dispatch(setDataServiceLoadingAction())
    try {
        console.log('purchase action')

        const count = await getPurchasesCount()
        const total = await getPurchasesTotal()
        const byMonth = await getPurchasesByMonth()
        const byYear = await getPurchasesByYear()
        const byCategory = await getPurchasesByCategory()
        const bySupplier = await getPurchasesBySupplier()

        const { purchases } = getState().DATA_SERVICES

        dispatch({
            type: DS_UPDATE_PURCHASES_STATS,
            payload: {
                ...purchases,
                count: count.data,
                total: total.data,
                byMonth: byMonth.data,
                byYear: byYear.data,
                byCategory: byCategory.data,
                bySupplier: bySupplier.data,
            },
        })
    } catch (errors) {
        toast.error('Error Loading Invoice Stats')
        dispatch(setDataServicesErrorAction(errors))
    }
}
