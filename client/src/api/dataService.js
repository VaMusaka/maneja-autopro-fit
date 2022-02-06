import axios from 'axios'

/// INVOICES
export const getInvoicesCount = async () => await axios('/data-service/invoices/count')
export const getInvoicesTotal = async () => await axios('/data-service/invoices/total')
export const getInvoicesUnPaidTotal = async () => await axios('/data-service/invoices/unpaid-total')
export const getInvoiceStatsByMonth = async () => await axios('/data-service/invoices/by-month')
export const getInvoiceStatsByYear = async () => await axios('/data-service/invoices/by-year')
export const getInvoiceStatsByTopCustomers = async () =>
    await axios('/data-service/invoices/top-by-customers')
export const getInvoicesByDate = async () => await axios('/data-service/invoices/by-date')

/// CUSTOMERS
export const getCustomersCount = async () => axios('/data-service/customers/count')
export const getCustomersCountByType = async () => axios('/data-service/customers/count-by-type')

/// SUPPLIERS
export const getSuppliersCount = async () => axios('/data-service/suppliers/count')

/// SERVICES
export const getServicesCount = async () => axios('/data-service/services/count')

/// PURCHASES
export const getPurchasesCount = async () => axios('/data-service/purchases/count')
export const getPurchasesTotal = async () => axios('/data-service/purchases/total')
export const getPurchasesByMonth = async () => axios('/data-service/purchases/by-month')
export const getPurchasesByYear = async () => axios('/data-service/purchases/by-year')
export const getPurchasesByCategory = async () => axios('/data-service/purchases/by-category')
export const getPurchasesBySupplier = async () => axios('/data-service/purchases/by-supplier')
