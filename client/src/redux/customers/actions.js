import {
    getCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    customerSearch,
} from 'api/customers'
import { toast } from 'react-toastify'
import {
    GET_CUSTOMERS,
    GET_CUSTOMER,
    SET_CUSTOMERS_LOADING,
    SET_CUSTOMERS_ERRORS,
    UPDATE_CUSTOMER_LAYOUT,
} from './types'

export const setCustomersLoadingAction = () => (dispatch) => {
    dispatch({ type: SET_CUSTOMERS_LOADING, payload: true })
}

export const setCustomersErrorsAction = (errors) => (dispatch) => {
    dispatch({ type: SET_CUSTOMERS_ERRORS, payload: errors })
}

export const getCustomersAction = () => async (dispatch) => {
    dispatch(setCustomersLoadingAction())
    try {
        const { data } = await getCustomers()
        dispatch({ type: GET_CUSTOMERS, payload: data })
    } catch (error) {
        toast.error('Error getting customers')
        dispatch(setCustomersErrorsAction(error))
    }
}

export const getCustomerAction = (customer) => async (dispatch) => {
    dispatch(setCustomersLoadingAction())
    try {
        const { data } = await getCustomer(customer)
        dispatch({ type: GET_CUSTOMER, payload: data })
    } catch (error) {
        toast.error('Error getting customer')
        dispatch(setCustomersErrorsAction(error))
    }
}

export const createCustomerAction = (customer) => async (dispatch, getState) => {
    dispatch(setCustomersLoadingAction())
    try {
        const { data } = await createCustomer(customer)
        const { customers, layout } = getState().CUSTOMERS

        customers.push(data)
        dispatch({ type: GET_CUSTOMERS, payload: customers })
        dispatch({
            type: UPDATE_CUSTOMER_LAYOUT,
            payload: { ...layout, openCreateDrawer: false },
        })
        toast.success('Customer created successfully')
    } catch (error) {
        toast.error('Error creating customer')
        dispatch(setCustomersErrorsAction(error))
    }
}

export const updateCustomerAction = (customer) => async (dispatch, getState) => {
    dispatch(setCustomersLoadingAction())
    try {
        const { data } = await updateCustomer(customer)
        const { customers } = getState().CUSTOMERS

        const updatedCustomers = customers.map((customer) => {
            if (customer._id === data._id) {
                return data
            }
            return customer
        })

        dispatch({
            type: GET_CUSTOMERS,
            payload: updatedCustomers,
        })
        toast.success('Customer updated successfully')
    } catch (error) {
        toast.error('Error updating customer')
        dispatch(setCustomersErrorsAction(error))
    }
}

export const deleteCustomerAction = (customer) => async (dispatch, getState) => {
    dispatch(setCustomersLoadingAction())
    try {
        await deleteCustomer(customer)
        const { customers } = getState().CUSTOMERS

        const updatedCustomers = customers.filter(({ _id }) => _id !== customer)

        dispatch({
            type: GET_CUSTOMERS,
            payload: updatedCustomers,
        })
    } catch (error) {
        toast.error('Error deleting customer')
        dispatch(setCustomersErrorsAction(error))
    }
}

export const searchCustomersAction = (search) => async (dispatch) => {
    dispatch(setCustomersLoadingAction())
    try {
        const { data } = await customerSearch(search)
        dispatch({ type: GET_CUSTOMERS, payload: data })
    } catch (error) {
        toast.error('Error searching for customers')
        dispatch(setCustomersErrorsAction(error))
    }
}
