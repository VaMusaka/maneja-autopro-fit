import {
    getPurchaseCategories,
    getPurchaseCategory,
    createPurchaseCategory,
    updatePurchaseCategory,
    deletePurchaseCategory,
    purchaseCategoriesSearch,
} from 'api/purchaseCategories'
import { toast } from 'react-toastify'
import {
    GET_PURCHASE_CATEGORIES,
    GET_PURCHASE_CATEGORY,
    SET_PURCHASE_CATEGORIES_LOADING,
    SET_PURCHASE_CATEGORIES_ERRORS,
    UPDATE_PURCHASE_CATEGORY_LAYOUT,
} from './types'
import { setPurchasesLoadingAction } from 'redux/purchases/actions'

export const setPurchaseCategoriesLoadingAction = () => (dispatch) => {
    dispatch({ type: SET_PURCHASE_CATEGORIES_LOADING, payload: true })
}

export const setPurchaseCategoriesErrorsAction = (errors) => (dispatch) => {
    dispatch({ type: SET_PURCHASE_CATEGORIES_ERRORS, payload: errors })
}

export const getPurchaseCategoriesAction = () => async (dispatch) => {
    dispatch(setPurchaseCategoriesLoadingAction())
    try {
        const { data } = await getPurchaseCategories()
        dispatch({ type: GET_PURCHASE_CATEGORIES, payload: data })
    } catch (error) {
        toast.error('Error getting purchase categories')
        dispatch(setPurchaseCategoriesErrorsAction(error))
    }
}

export const getPurchaseCategoryAction = (purchase) => async (dispatch) => {
    dispatch(setPurchaseCategoriesLoadingAction())
    try {
        const { data } = await getPurchaseCategory(purchase)
        dispatch({ type: GET_PURCHASE_CATEGORY, payload: data })
    } catch (error) {
        toast.error('Error getting purchase category')
        dispatch(setPurchaseCategoriesErrorsAction(error))
    }
}

export const createPurchaseCategoryAction = (purchase) => async (dispatch, getState) => {
    dispatch(setPurchaseCategoriesLoadingAction())
    try {
        const { data } = await createPurchaseCategory(purchase)
        const { purchaseCategories, layout } = getState().PURCHASE_CATEGORIES

        purchaseCategories.push(data)

        dispatch({ type: GET_PURCHASE_CATEGORIES, payload: purchaseCategories })

        dispatch({
            type: UPDATE_PURCHASE_CATEGORY_LAYOUT,
            payload: { ...layout, openCreateDrawer: false },
        })
        toast.success('Purchase category created successfully')
    } catch (error) {
        toast.error('Error creating purchase category')
        dispatch(setPurchaseCategoriesErrorsAction(error))
    }
}

export const updatePurchaseCategoryAction = (purchase) => async (dispatch, getState) => {
    dispatch(setPurchaseCategoriesLoadingAction())
    try {
        const { data } = await updatePurchaseCategory(purchase)
        const { purchaseCategories } = getState().PURCHASE_CATEGORIES

        const updatedPurchaseCategories = purchaseCategories.map((purchase) =>
            purchase._id === data._id ? data : purchase
        )

        dispatch({
            type: GET_PURCHASE_CATEGORIES,
            payload: updatedPurchaseCategories,
        })
    } catch (error) {
        toast.error('Error getting purchase category')
        dispatch(setPurchaseCategoriesErrorsAction(error))
    }
}

export const deletePurchaseCategoryAction = (purchaseCategory) => async (dispatch, getState) => {
    dispatch(setPurchaseCategoriesLoadingAction())
    try {
        await deletePurchaseCategory(purchaseCategory)

        const { purchaseCategories } = getState().PURCHASE_CATEGORIES

        const updatedPurchaseCategories = purchaseCategories.filter(
            ({ _id }) => _id !== purchaseCategory
        )

        dispatch({
            type: GET_PURCHASE_CATEGORIES,
            payload: updatedPurchaseCategories,
        })
    } catch (error) {
        console.log(typeof error.response.data)
        const message =
            typeof error?.response?.data === 'string'
                ? error?.response?.data
                : 'Error deleting purchase category'

        toast.error(message)
        dispatch(setPurchaseCategoriesErrorsAction(error))
    }
}

export const searchPurchaseCategoriesAction = (search) => async (dispatch) => {
    dispatch(setPurchasesLoadingAction())
    try {
        const { data } = await purchaseCategoriesSearch(search)
        dispatch({ type: GET_PURCHASE_CATEGORIES, payload: data })
    } catch (error) {
        console.log(error)
        toast.error('Error searching purchase categories')
        dispatch(setPurchaseCategoriesErrorsAction(error))
    }
}
