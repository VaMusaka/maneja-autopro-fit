import {
    getPurchases,
    getPurchase,
    createPurchase,
    updatePurchase,
    deletePurchase,
    purchasesSearch,
} from 'api/purchases'
import { toast } from 'react-toastify'
import {
    GET_PURCHASES,
    GET_PURCHASE,
    SET_PURCHASES_LOADING,
    SET_PURCHASES_ERRORS,
    UPDATE_PURCHASES_LAYOUT,
} from './types'
import { getInvoiceAction } from '../invoices/actions'

export const setPurchasesLoadingAction = () => (dispatch) => {
    dispatch({ type: SET_PURCHASES_LOADING, payload: true })
}

export const setPurchasesErrorsAction = (errors) => (dispatch) => {
    dispatch({ type: SET_PURCHASES_ERRORS, payload: errors })
}

export const getPurchasesAction = (filters) => async (dispatch) => {
    dispatch(setPurchasesLoadingAction())
    try {
        const { data } = await getPurchases(filters)
        dispatch({ type: GET_PURCHASES, payload: data })
    } catch (error) {
        toast.error('Error getting purchases')
        dispatch(setPurchasesErrorsAction(error))
    }
}

export const getPurchaseAction = (purchase) => async (dispatch) => {
    dispatch(setPurchasesLoadingAction())
    try {
        const { data } = await getPurchase(purchase)
        dispatch({ type: GET_PURCHASE, payload: data })
    } catch (error) {
        toast.error('Error getting purchase')
        dispatch(setPurchasesErrorsAction(error))
    }
}

export const createPurchaseAction = (purchase) => async (dispatch, getState) => {
    dispatch(setPurchasesLoadingAction())
    try {
        const { data } = await createPurchase(purchase)
        const { purchases, layout } = getState().PURCHASES
        const { invoice } = getState().INVOICES

        if (invoice?._id === data?.invoice) {
            dispatch(getInvoiceAction(invoice?._id))
        }

        if (purchases) {
            purchases.push(data)
            dispatch({ type: GET_PURCHASES, payload: purchases })
        } else {
            dispatch({ type: GET_PURCHASES, payload: [data] })
        }

        dispatch({ type: UPDATE_PURCHASES_LAYOUT, payload: { ...layout, openCreateDrawer: false } })
        toast.success('Purchase created successfully')
    } catch (error) {
        console.log(error)
        toast.error('Error creating purchase')
        dispatch(setPurchasesErrorsAction(error))
    }
}

export const updatePurchaseAction = (purchase) => async (dispatch, getState) => {
    dispatch(setPurchasesLoadingAction())
    try {
        const { data } = await updatePurchase(purchase)
        const { purchases } = getState().PURCHASES
        const { invoice } = getState().INVOICES

        let updatedPurchases = null

        if (!purchases) {
            if (!invoice) {
                dispatch(getPurchases())
            } else {
                if (invoice?._id === data?._id) {
                    console.log('invoice match', invoice?._id)
                    dispatch(getInvoiceAction(invoice?._id))
                }
            }
        } else {
            console.info('updating purchases')
            updatedPurchases = purchases.map((purchase) =>
                purchase._id === data._id ? data : purchase
            )
        }

        dispatch({
            type: GET_PURCHASES,
            payload: updatedPurchases,
        })
        toast.success('Purchase updated successfully')
    } catch (error) {
        toast.error('Error updating purchase')
        dispatch(setPurchasesErrorsAction(error))
    }
}

export const deletePurchaseAction = (purchase) => async (dispatch, getState) => {
    dispatch(setPurchasesLoadingAction())
    try {
        await deletePurchase(purchase)
        const { purchases } = getState().PURCHASES
        const { invoice } = getState().INVOICES

        if (!purchases) {
            if (!invoice) {
                dispatch(getPurchases())
            } else {
                dispatch(getInvoiceAction(invoice?._id))
            }
        } else {
            const updatedPurchases = purchases.filter(({ _id }) => _id !== purchase)
            dispatch({
                type: GET_PURCHASES,
                payload: updatedPurchases,
            })
        }

        toast.success('Purchase deleted successfully')
    } catch (error) {
        toast.error('Error deleting purchase')
        dispatch(setPurchasesErrorsAction(error))
    }
}

export const searchPurchasesAction = (search) => async (dispatch) => {
    dispatch(setPurchasesLoadingAction())
    try {
        const { data } = await purchasesSearch(search)
        dispatch({ type: GET_PURCHASES, payload: data })
    } catch (error) {
        toast.error('Error searching for purchases')
        dispatch(setPurchasesErrorsAction(error))
    }
}
