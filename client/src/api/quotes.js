import axios from 'axios'
import { makeQueryString } from 'utils'

export const getQuotes = async (filters) => {
    if (filters) {
        const queryString = makeQueryString(filters)
        return await axios.get(`quotes?${queryString}`)
    }
    return await axios.get('quotes')
}

export const createQuoteLine = async (quote) =>
    await axios.put(`quotes/${quote._id}/new-line`, quote)

export const updateQuoteLines = async (quote) =>
    await axios.patch(`quotes/${quote._id}/lines`, quote.lines)

export const getQuote = async (quote) => await axios.get(`quotes/${quote}`)

export const createQuote = async (quote) => await axios.post('quotes', quote)

export const updateQuote = async (quote) => await axios.put(`quotes/${quote._id}`, quote)

export const deleteQuote = async (quote) => await axios.delete(`quotes/${quote}`)

export const generateInvoice = async (quote) => await axios.put(`quotes/${quote}/invoice`)

export const searchQuote = async (search) => await axios.post('quotes/search', search)
