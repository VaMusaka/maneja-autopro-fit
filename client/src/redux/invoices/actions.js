import {
    getInvoices,
    getInvoice,
    createInvoice,
    createInvoiceLine,
    updateInvoice,
    deleteInvoice,
    createInvoicePayments,
    searchInvoice,
    updateInvoiceLines,
    createMotInvoice,
} from 'api/invoices'

import { getInvoiceStatsByMonth, getInvoiceStatsByYear, getInvoicesByDate } from 'api/dataService'
import { toast } from 'react-toastify'
import {
    GET_INVOICES,
    GET_INVOICE,
    SET_INVOICES_LOADING,
    SET_INVOICES_ERRORS,
    GET_GROUPED_INVOICES,
    UPDATE_INVOICES_LAYOUT,
} from './types'

export const setInvoicesLoadingAction = () => (dispatch) => {
    dispatch({ type: SET_INVOICES_LOADING, payload: true })
}

export const setInvoicesErrorsAction = (errors) => (dispatch) => {
    dispatch({ type: SET_INVOICES_ERRORS, payload: errors })
}

export const getInvoicesAction =
    (filters = null) =>
    async (dispatch) => {
        dispatch(setInvoicesLoadingAction())
        try {
            const { data } = await getInvoices(filters)
            dispatch({ type: GET_INVOICES, payload: data })
        } catch (error) {
            toast.error('Error getting invoices')
            dispatch(setInvoicesErrorsAction(error))
        }
    }

export const getInvoiceAction = (invoice) => async (dispatch) => {
    dispatch(setInvoicesLoadingAction())
    try {
        const { data } = await getInvoice(invoice)
        dispatch({ type: GET_INVOICE, payload: data })
    } catch (error) {
        toast.error('Error getting invoice')
        dispatch(setInvoicesErrorsAction(error))
    }
}

const updateGrouped = (data) => (dispatch, getState) => {
    dispatch(setInvoicesLoadingAction())
    const { grouped } = getState().INVOICES

    dispatch({ type: GET_GROUPED_INVOICES, payload: { ...grouped, ...data } })
}

export const getInvoicesByDateAction = () => async (dispatch) => {
    dispatch(setInvoicesLoadingAction())
    const { data } = await getInvoicesByDate()
    dispatch(updateGrouped({ byDate: data }))
}

export const getInvoicesByMonthAction = () => async (dispatch) => {
    dispatch(setInvoicesLoadingAction())
    try {
        const { data } = await getInvoiceStatsByMonth()
        dispatch(updateGrouped({ byMonth: data }))
    } catch (error) {
        toast.error('Error getting invoices grouped by month')
        dispatch(setInvoicesErrorsAction(error))
    }
}

export const getInvoicesByYearAction = () => async (dispatch) => {
    dispatch(setInvoicesLoadingAction())
    try {
        const { data } = await getInvoiceStatsByYear()
        dispatch(updateGrouped({ byYear: data }))
    } catch (error) {
        toast.error('Error getting invoices grouped by month')
        dispatch(setInvoicesErrorsAction(error))
    }
}

export const createInvoiceAction =
    (invoice, history, isMotInvoice = false) =>
    async (dispatch, getState) => {
        dispatch(setInvoicesLoadingAction())
        try {
            const { data } = isMotInvoice ? await createMotInvoice(invoice) : createInvoice(invoice)
            const { invoices, layout } = getState().INVOICES

            invoices.push(data)

            dispatch({ type: GET_INVOICES, payload: invoices })
            dispatch({
                type: UPDATE_INVOICES_LAYOUT,
                payload: { ...layout, openCreateDrawer: false },
            })
            history.push(`/invoices/${data._id}/view`)

            toast.success('Invoice created successfully')
        } catch (error) {
            toast.error('Error creating invoice')
            dispatch(setInvoicesErrorsAction(error))
        }
    }

export const updateInvoiceAction = (invoice) => async (dispatch, getState) => {
    dispatch(setInvoicesLoadingAction())
    try {
        const { data } = await updateInvoice(invoice)
        const { invoices } = getState().INVOICES

        const updatedInvoices = invoices.map((invoice) =>
            invoice._id === data._id ? data : invoice
        )

        dispatch({
            type: GET_INVOICES,
            payload: updatedInvoices,
        })
        dispatch({
            type: GET_INVOICE,
            payload: data,
        })
        toast.success('Invoice updated successfully')
    } catch (error) {
        toast.error('Error getting invoice')
        dispatch(setInvoicesErrorsAction(error))
    }
}

export const createInvoiceLineAction = (invoiceLine) => async (dispatch, getState) => {
    dispatch(setInvoicesLoadingAction())
    try {
        const { data } = await createInvoiceLine(invoiceLine)
        const { invoices } = getState().INVOICES

        const updatedInvoices =
            invoices && invoices.map((invoice) => (invoice._id === data._id ? data : invoice))

        dispatch({
            type: GET_INVOICES,
            payload: updatedInvoices,
        })
        dispatch({
            type: GET_INVOICE,
            payload: data,
        })
    } catch (error) {
        console.log(error)
        toast.error('Error getting invoice')
        dispatch(setInvoicesErrorsAction(error))
    }
}

export const updateInvoiceLineAction = (invoiceLines) => async (dispatch, getState) => {
    dispatch(setInvoicesLoadingAction())
    try {
        const { data } = await updateInvoiceLines(invoiceLines)
        const { invoices } = getState().INVOICES

        const updatedInvoices =
            invoices && invoices.map((invoice) => (invoice._id === data._id ? data : invoice))

        dispatch({
            type: GET_INVOICES,
            payload: updatedInvoices,
        })
        dispatch({
            type: GET_INVOICE,
            payload: data,
        })
    } catch (error) {
        console.log(error)
        toast.error('Error getting invoice')
        dispatch(setInvoicesErrorsAction(error))
    }
}

export const createInvoicePaymentsAction = (payments) => async (dispatch, getState) => {
    dispatch(setInvoicesLoadingAction())
    try {
        const { data } = await createInvoicePayments(payments)
        const { invoices } = getState().INVOICES

        const updatedInvoices =
            invoices && invoices.map((invoice) => (invoice._id === data._id ? data : invoice))

        dispatch({
            type: GET_INVOICES,
            payload: updatedInvoices,
        })
        dispatch({
            type: GET_INVOICE,
            payload: data,
        })
    } catch (error) {
        console.log(error)
        toast.error('Error getting invoice')
        dispatch(setInvoicesErrorsAction(error))
    }
}

export const deleteInvoiceAction = (invoice) => async (dispatch, getState) => {
    dispatch(setInvoicesLoadingAction())
    try {
        await deleteInvoice(invoice)
        const { invoices } = getState().INVOICES

        const updatedInvoices = invoices.filter(({ _id }) => _id !== invoice)

        dispatch({
            type: GET_INVOICES,
            payload: updatedInvoices,
        })
        toast.success('Invoice deleted successfully')
    } catch (error) {
        toast.error('Error deleting invoice')
        dispatch(setInvoicesErrorsAction(error))
    }
}

export const searchInvoiceAction = (search) => async (dispatch) => {
    dispatch(setInvoicesLoadingAction())
    try {
        const { data } = await searchInvoice(search)
        dispatch({ type: GET_INVOICES, payload: data })
    } catch (error) {
        toast.error('Error deleting invoice')
        dispatch(setInvoicesErrorsAction(error))
    }
}
