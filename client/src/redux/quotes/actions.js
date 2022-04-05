import {
    getQuotes,
    getQuote,
    createQuote,
    createQuoteLine,
    updateQuote,
    deleteQuote,
    searchQuote,
    updateQuoteLines,
} from 'api/quotes'

import { toast } from 'react-toastify'
import {
    GET_QUOTES,
    GET_QUOTE,
    SET_QUOTES_LOADING,
    SET_QUOTES_ERRORS,
    UPDATE_QUOTES_LAYOUT,
} from './types'

export const setQuotesLoadingAction = () => (dispatch) => {
    dispatch({ type: SET_QUOTES_LOADING, payload: true })
}

export const setQuotesErrorsAction = (errors) => (dispatch) => {
    dispatch({ type: SET_QUOTES_ERRORS, payload: errors })
}

export const getQuotesAction =
    (filters = null) =>
    async (dispatch) => {
        dispatch(setQuotesLoadingAction())
        try {
            const { data } = await getQuotes(filters)
            dispatch({ type: GET_QUOTES, payload: data })
        } catch (error) {
            toast.error('Error getting quotes')
            dispatch(setQuotesErrorsAction(error))
        }
    }

export const getQuoteAction = (quote) => async (dispatch) => {
    dispatch(setQuotesLoadingAction())
    try {
        const { data } = await getQuote(quote)
        dispatch({ type: GET_QUOTE, payload: data })
    } catch (error) {
        toast.error('Error getting quote')
        dispatch(setQuotesErrorsAction(error))
    }
}

export const createQuoteAction = (quote, history) => async (dispatch, getState) => {
    dispatch(setQuotesLoadingAction())
    try {
        const { data } = await createQuote(quote)
        const { quotes, layout } = getState().QUOTES

        quotes.push(data)

        dispatch({ type: GET_QUOTES, payload: quotes })
        dispatch({ type: UPDATE_QUOTES_LAYOUT, payload: { ...layout, openCreateDrawer: false } })
        history.push(`/quotes/${data._id}/view`)

        toast.success('Quote created successfully')
    } catch (error) {
        toast.error('Error creating quote')
        dispatch(setQuotesErrorsAction(error))
    }
}

export const updateQuoteAction = (quote) => async (dispatch, getState) => {
    dispatch(setQuotesLoadingAction())
    try {
        const { data } = await updateQuote(quote)
        const { quotes } = getState().QUOTES

        const updatedQuotes = quotes.map((quote) => (quote._id === data._id ? data : quote))

        dispatch({
            type: GET_QUOTES,
            payload: updatedQuotes,
        })
        dispatch({
            type: GET_QUOTE,
            payload: data,
        })
        toast.success('Quote updated successfully')
    } catch (error) {
        toast.error('Error getting quote')
        dispatch(setQuotesErrorsAction(error))
    }
}

export const createQuoteLineAction = (quoteLine) => async (dispatch, getState) => {
    dispatch(setQuotesLoadingAction())
    try {
        const { data } = await createQuoteLine(quoteLine)
        const { quotes } = getState().QUOTES

        const updatedQuotes =
            quotes && quotes.map((quote) => (quote._id === data._id ? data : quote))

        dispatch({
            type: GET_QUOTES,
            payload: updatedQuotes,
        })
        dispatch({
            type: GET_QUOTE,
            payload: data,
        })
    } catch (error) {
        console.log(error)
        toast.error('Error getting quote')
        dispatch(setQuotesErrorsAction(error))
    }
}

export const updateQuoteLineAction = (quoteLines) => async (dispatch, getState) => {
    dispatch(setQuotesLoadingAction())
    try {
        const { data } = await updateQuoteLines(quoteLines)
        const { quotes } = getState().QUOTES

        const updatedQuotes =
            quotes && quotes.map((quote) => (quote._id === data._id ? data : quote))

        dispatch({
            type: GET_QUOTES,
            payload: updatedQuotes,
        })
        dispatch({
            type: GET_QUOTE,
            payload: data,
        })
    } catch (error) {
        console.log(error)
        toast.error('Error getting quote')
        dispatch(setQuotesErrorsAction(error))
    }
}

export const deleteQuoteAction = (quote) => async (dispatch, getState) => {
    dispatch(setQuotesLoadingAction())
    try {
        await deleteQuote(quote)
        const { quotes } = getState().QUOTES

        const updatedQuotes = quotes.filter(({ _id }) => _id !== quote)

        dispatch({
            type: GET_QUOTES,
            payload: updatedQuotes,
        })
        toast.success('Quote deleted successfully')
    } catch (error) {
        toast.error('Error deleting quote')
        dispatch(setQuotesErrorsAction(error))
    }
}

export const searchQuoteAction = (search) => async (dispatch) => {
    dispatch(setQuotesLoadingAction())
    try {
        const { data } = await searchQuote(search)
        dispatch({ type: GET_QUOTES, payload: data })
    } catch (error) {
        toast.error('Error deleting quote')
        dispatch(setQuotesErrorsAction(error))
    }
}
