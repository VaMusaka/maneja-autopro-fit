import {
    getSuppliers,
    getSupplier,
    createSupplier,
    updateSupplier,
    deleteSupplier,
    suppliersSearch,
} from 'api/suppliers'
import { toast } from 'react-toastify'
import {
    GET_SUPPLIERS,
    GET_SUPPLIER,
    SET_SUPPLIERS_LOADING,
    SET_SUPPLIERS_ERRORS,
    UPDATE_SUPPLIERS_LAYOUT,
} from './types'

export const setSuppliersLoadingAction = () => (dispatch) => {
    dispatch({ type: SET_SUPPLIERS_LOADING, payload: true })
}

export const setSuppliersErrorsAction = (errors) => (dispatch) => {
    dispatch({ type: SET_SUPPLIERS_ERRORS, payload: errors })
}

export const getSuppliersAction = () => async (dispatch) => {
    dispatch(setSuppliersLoadingAction())
    try {
        const { data } = await getSuppliers()
        dispatch({ type: GET_SUPPLIERS, payload: data })
    } catch (error) {
        toast.error('Error getting suppliers')
        dispatch(setSuppliersErrorsAction(error))
    }
}

export const getSupplierAction = (supplier) => async (dispatch) => {
    dispatch(setSuppliersLoadingAction())
    try {
        const { data } = await getSupplier(supplier)
        dispatch({ type: GET_SUPPLIER, payload: data })
    } catch (error) {
        toast.error('Error getting supplier')
        dispatch(setSuppliersErrorsAction(error))
    }
}

export const createSupplierAction = (supplier) => async (dispatch, getState) => {
    dispatch(setSuppliersLoadingAction())
    try {
        const { data } = await createSupplier(supplier)
        const { suppliers, layout } = getState().SUPPLIERS

        suppliers.push(data)
        dispatch({ type: GET_SUPPLIERS, payload: suppliers })
        dispatch({ type: UPDATE_SUPPLIERS_LAYOUT, payload: { ...layout, openCreateDrawer: false } })

        toast.success('Supplier created successfully')
    } catch (error) {
        toast.error('Error creating supplier')
        dispatch(setSuppliersErrorsAction(error))
    }
}

export const updateSupplierAction = (supplier) => async (dispatch, getState) => {
    dispatch(setSuppliersLoadingAction())
    try {
        const { data } = await updateSupplier(supplier)
        const { suppliers } = getState().SUPPLIERS

        const updatedSuppliers = suppliers.map((supplier) =>
            supplier._id === data._id ? data : supplier
        )

        dispatch({
            type: GET_SUPPLIERS,
            payload: updatedSuppliers,
        })
        toast.success('Supplier updated successfully')
    } catch (error) {
        toast.error('Error updating supplier')
        dispatch(setSuppliersErrorsAction(error))
    }
}

export const deleteSupplierAction = (supplier) => async (dispatch, getState) => {
    dispatch(setSuppliersLoadingAction())
    try {
        await deleteSupplier(supplier)
        const { suppliers } = getState().SUPPLIERS
        const updatedSuppliers = suppliers.filter(({ _id }) => _id !== supplier)

        dispatch({
            type: GET_SUPPLIERS,
            payload: updatedSuppliers,
        })
        toast.success('Supplier deleted successfully')
    } catch (error) {
        toast.error('Error deleting supplier')
        dispatch(setSuppliersErrorsAction(error))
    }
}

export const searchSuppliersAction = (search) => async (dispatch) => {
    dispatch(setSuppliersLoadingAction())
    try {
        const { data } = await suppliersSearch(search)
        dispatch({ type: GET_SUPPLIERS, payload: data })
    } catch (error) {
        toast.error('Error searching for suppliers')
        dispatch(setSuppliersErrorsAction(error))
    }
}
