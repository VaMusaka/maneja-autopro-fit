import TransactionTableActions from './transactionsTable/TransactionTableActions'
import dayjs from 'dayjs'
import { makeDropDownOptions } from 'utils'
import { companyDetails } from 'config'

export const purchaseTableColumns = [
    {
        name: '#',
        selector: (row) => row.autoId,
        sortable: true,
    },
    {
        name: 'Reference',
        selector: (row) => row.customerRef,
        sortable: true,
    },
    {
        name: 'Department',
        selector: (row) => row.department,
        sortable: true,
    },
    {
        name: 'Amount (£)',
        selector: (row) => row.amount,
        cell: (row) => `£ ${parseInt(row.amount).toFixed(2) || '0.00'}`,
        sortable: true,
    },
    {
        name: 'Transaction Date',
        selector: (row) => dayjs(row.date).format('DD MMM YYYY'),
        sortable: true,
    },
    {
        name: 'Actions',
        selector: (row) => TransactionTableActions(row),
    },
]

export const transactionFormFields = [
    {
        component: 'MuiSelectField',
        name: 'department',
        label: 'Invoice Department',
        options: makeDropDownOptions(companyDetails.departments, 'name', 'name'),
    },
    {
        component: 'MuiTextField',
        name: 'customerRef',
        label: 'Reference',
    },
    {
        component: 'MuiTextField',
        name: 'amount',
        label: 'Transaction Amount',
    },
    {
        component: 'MuiDatepicker',
        name: 'date',
        label: 'Transaction Date',
    },
    {
        component: 'MuiTextField',
        name: 'notes',
        label: 'Additional Notes',
        multiline: true,
        rows: 5,
    },
]
