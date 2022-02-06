import {
    getServices,
    getService,
    createService,
    updateService,
    deleteService,
    servicesSearch,
} from 'api/services'
import { toast } from 'react-toastify'
import {
    GET_SERVICES,
    GET_SERVICE,
    SET_SERVICES_LOADING,
    SET_SERVICES_ERRORS,
    UPDATE_SERVICE_LAYOUT,
} from './types'

export const setServicesLoadingAction = () => (dispatch) => {
    dispatch({ type: SET_SERVICES_LOADING, payload: true })
}

export const setServicesErrorsAction = (errors) => (dispatch) => {
    dispatch({ type: SET_SERVICES_ERRORS, payload: errors })
}

export const getServicesAction = () => async (dispatch) => {
    dispatch(setServicesLoadingAction())
    try {
        const { data } = await getServices()
        dispatch({ type: GET_SERVICES, payload: data })
    } catch (error) {
        toast.error('Error getting services')
        dispatch(setServicesErrorsAction(error))
    }
}

export const getServiceAction = (service) => async (dispatch) => {
    dispatch(setServicesLoadingAction())
    try {
        const { data } = await getService(service)
        dispatch({ type: GET_SERVICE, payload: data })
    } catch (error) {
        toast.error('Error getting service')
        dispatch(setServicesErrorsAction(error))
    }
}

export const createServiceAction = (service) => async (dispatch, getState) => {
    dispatch(setServicesLoadingAction())
    try {
        const { data } = await createService(service)
        const { services, layout } = getState().SERVICES

        services.push(data)

        dispatch({ type: GET_SERVICES, payload: services })
        dispatch({
            type: UPDATE_SERVICE_LAYOUT,
            payload: { ...layout, openCreateDrawer: false },
        })
        toast.success('Service created successfully')
    } catch (error) {
        toast.error('Error creating service')
        dispatch(setServicesErrorsAction(error))
    }
}

export const updateServiceAction = (service) => async (dispatch, getState) => {
    dispatch(setServicesLoadingAction())
    try {
        const { data } = await updateService(service)
        const { services } = getState().SERVICES

        const updatedServices = services.map((service) =>
            service._id === data._id ? data : service
        )

        dispatch({
            type: GET_SERVICES,
            payload: updatedServices,
        })
    } catch (error) {
        toast.error('Error getting service')
        dispatch(setServicesErrorsAction(error))
    }
}

export const deleteServiceAction = (service) => async (dispatch, getState) => {
    dispatch(setServicesLoadingAction())
    try {
        await deleteService(service)

        const { services } = getState().SERVICES

        const updatedServices = services.filter(({ _id }) => _id !== service)

        dispatch({
            type: GET_SERVICES,
            payload: updatedServices,
        })
    } catch (error) {
        toast.error('Error getting service')
        dispatch(setServicesErrorsAction(error))
    }
}

export const searchServicesAction = (search) => async (dispatch) => {
    dispatch(setServicesLoadingAction())
    try {
        const { data } = await servicesSearch(search)
        dispatch({ type: GET_SERVICES, payload: data })
    } catch (error) {
        toast.error('Error searching for services')
        dispatch(setServicesErrorsAction(error))
    }
}
