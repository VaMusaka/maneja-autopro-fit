import { getUsers, getUser, createUser, updateUser, deleteUser, usersSearch } from 'api/users'
import { toast } from 'react-toastify'
import {
    GET_USERS,
    GET_USER,
    SET_USERS_LOADING,
    SET_USERS_ERRORS,
    UPDATE_USERS_LAYOUT,
} from './types'

export const setUsersLoadingAction = () => (dispatch) => {
    dispatch({ type: SET_USERS_LOADING, payload: true })
}

export const setUsersErrorsAction = (errors) => (dispatch) => {
    dispatch({ type: SET_USERS_ERRORS, payload: errors })
}

export const getUsersAction = () => async (dispatch) => {
    dispatch(setUsersLoadingAction())
    try {
        const { data } = await getUsers()
        dispatch({ type: GET_USERS, payload: data })
    } catch (error) {
        toast.error('Error getting users')
        dispatch(setUsersErrorsAction(error))
    }
}

export const getUserAction = (user) => async (dispatch) => {
    dispatch(setUsersLoadingAction())
    try {
        const { data } = await getUser(user)
        dispatch({ type: GET_USER, payload: data })
    } catch (error) {
        toast.error('Error getting user')
        dispatch(setUsersErrorsAction(error))
    }
}

export const createUserAction = (user) => async (dispatch, getState) => {
    dispatch(setUsersLoadingAction())
    try {
        const { data } = await createUser(user)
        const { users, layout } = getState().USERS

        users.push(data)

        dispatch({ type: GET_USERS, payload: users })
        dispatch({ type: UPDATE_USERS_LAYOUT, payload: { ...layout, openCreateDrawer: false } })
    } catch (error) {
        console.log(error.response.data)
        toast.error('Error creating user')
        dispatch(setUsersErrorsAction(error))
    }
}

export const updateUserAction = (user) => async (dispatch, getState) => {
    dispatch(setUsersLoadingAction())
    try {
        const { data } = await updateUser(user)
        const { users } = getState().USERS

        const updatedUsers = users.map((user) => {
            if (user._id === data._id) {
                return data
            }
            return user
        })

        dispatch({
            type: GET_USERS,
            payload: updatedUsers,
        })
        toast.success('Updated user successfully')
    } catch (error) {
        toast.error('Error updating user')
        dispatch(setUsersErrorsAction(error))
    }
}

export const deleteUserAction = (user) => async (dispatch, getState) => {
    dispatch(setUsersLoadingAction())
    try {
        await deleteUser(user)
        const { users } = getState().USERS

        dispatch({
            type: GET_USERS,
            payload: users.filter(({ _id }) => _id !== user),
        })
        toast.success('User deleted successfully')
    } catch (error) {
        toast.error('Error deleting user')
        dispatch(setUsersErrorsAction(error))
    }
}

export const searchUsersAction = (search) => async (dispatch) => {
    dispatch(setUsersLoadingAction())
    try {
        const { data } = await usersSearch(search)
        dispatch({ type: GET_USERS, payload: data })
    } catch (error) {
        toast.error('Error searching for purchases')
        dispatch(setUsersErrorsAction(error))
    }
}
