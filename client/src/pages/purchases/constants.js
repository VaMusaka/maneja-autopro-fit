import { makeDropDownOptions } from 'utils'
import PurchaseTableActions from './purchaseTable/PurchaseTableActions'

import dayjs from 'dayjs'

export const purchaseTableColumns = [
    {
        name: '#Id',
        selector: (row) => `# ${row.autoId}`,
        sortable: true,
    },
    {
        name: 'Invoice/Product (#)',
        selector: (row) =>
            `# ${row?.invoice?.autoId ? row?.invoice?.autoId : row?.product?.autoId}`,
        sortable: true,
    },
    {
        name: 'Supplier',
        selector: (row) => row.supplier.name,
        sortable: true,
    },
    {
        name: 'Category',
        selector: (row) => row.purchaseCategory.name,
        sortable: true,
    },
    {
        name: 'Warranty',
        selector: (row) => row.warranty,
        sortable: true,
    },
    {
        name: 'Total',
        selector: (row) => `£ ${row.total}`,
        sortable: true,
    },
    {
        name: 'Invoice Date',
        selector: (row) => dayjs(row.supplierInvoiceDate).format('DD MMM YYYY'),
        sortable: true,
    },
    {
        name: 'Actions',
        selector: (row) => PurchaseTableActions({ purchase: row }),
    },
]

export const purchaseFormFields = (suppliers, purchaseCategories) => {
    return [
        {
            component: 'MuiTextField',
            name: 'invoicedTo',
            label: 'Invoiced To',
        },
        {
            component: 'MuiTextField',
            name: 'pdfName',
            label: 'PDF Name',
            size: { sm: 6, md: 6 },
        },
        {
            component: 'MuiTextField',
            name: 'pdfPageNumber',
            label: 'Page No',
            size: { sm: 6, md: 6 },
        },
        {
            component: 'MuiTextField',
            name: 'details',
            multiline: true,
            rows: 2,
            label: 'Purchase Invoice Details',
        },
        {
            component: 'MuiTextField',
            name: 'invoiceLinesCount',
            label: 'Invoice Lines Count',
            size: { sm: 6, md: 6 },
        },
        {
            component: 'MuiTextField',
            name: 'invoiceLinesBilled',
            label: 'Invoice Lines Billed',
            size: { sm: 6, md: 6 },
        },
        {
            component: 'MuiTextField',
            name: 'invoiceLinesDelivered',
            label: 'Invoice Lines Delivered',
            size: { sm: 6, md: 6 },
        },
        {
            component: 'MuiTextField',
            name: 'amount',
            label: 'Sub Total (Pre VAT)',
            size: { sm: 6, md: 6 },
        },
        {
            component: 'MuiTextField',
            name: 'vat',
            label: 'Invoice Vat',
            size: { sm: 6, md: 6 },
        },
        {
            component: 'MuiTextField',
            name: 'total',
            label: 'Invoice Total',
            size: { sm: 6, md: 6 },
        },
        {
            component: 'MuiTextField',
            name: 'warranty',
            label: 'Warranty',
            size: { sm: 6, md: 6 },
        },
        {
            component: 'MuiCheckBox',
            name: 'paid',
            label: 'Paid',
            size: { sm: 6, md: 6 },
        },
        {
            component: 'MuiSelectField',
            name: 'supplier',
            label: 'Supplier',
            options: makeDropDownOptions(suppliers, 'name', '_id'),
        },
        {
            component: 'MuiSelectField',
            name: 'purchaseCategory',
            label: 'Purchase Category',
            options: makeDropDownOptions(purchaseCategories, 'name', '_id'),
        },
        {
            component: 'MuiTextField',
            name: 'supplierInvoiceNumber',
            label: 'Supplier Invoice Number',
        },
        {
            component: 'MuiDatepicker',
            name: 'supplierInvoiceDate',
            label: 'Supplier Invoice Date ',
        },
    ]
}
