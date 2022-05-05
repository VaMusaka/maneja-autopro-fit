import axios from 'axios'
import { makeQueryString } from 'utils'
export const getInvoices = async (filters) => {
    if (filters) {
        const queryString = makeQueryString(filters)
        return await axios.get(`invoices?${queryString}`)
    }
    return await axios.get('invoices')
}

export const createInvoiceLine = async (invoice) =>
    await axios.put(`invoices/${invoice._id}/new-line`, invoice)

export const updateInvoiceLines = async (invoice) =>
    await axios.patch(`invoices/${invoice._id}/lines`, invoice.lines)

export const createInvoicePayments = async (payments) =>
    await axios.put(`invoices/${payments._id}/payments`, payments)

export const getInvoice = async (invoice) => await axios.get(`invoices/${invoice}`)

export const createInvoice = async (invoice) => await axios.post('invoices', invoice)

export const createMotInvoice = async (invoice) => await axios.post('invoices/mot', invoice)

export const updateInvoice = async (invoice) => await axios.put(`invoices/${invoice._id}`, invoice)

export const deleteInvoice = async (invoice) => await axios.delete(`invoices/${invoice}`)

export const bulkReview = async (invoices) => await axios.patch(`invoices/bulk-review`, invoices)

export const searchInvoice = async (search) => await axios.post('invoices/search', search)
