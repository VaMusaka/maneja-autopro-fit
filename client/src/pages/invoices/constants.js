import React from 'react'
import { Chip, IconButton } from '@mui/material'
import InvoiceTableActions from './invoiceTable/InvoiceTableActions'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import {
    invoiceIsPaidInFull,
    makeCustomerSelectOptions,
    makeDropDownOptions,
    makeServiceSelectionOptions,
    openTab,
    getDepartment,
} from 'utils'
import MuiPallete from 'theme/palette'
import { companyDetails, invoiceSettings } from 'config'
import { MuiDrawer, MuiIcon } from 'components/common'
import UpdateInvoiceLineForm from './viewInvoice/UpdateInvoiceLineForm'
import DeleteInvoiceLine from './viewInvoice/DeleteInvoiceLine'

dayjs.extend(relativeTime)

const PaidInFull = (invoice) => {
    const isPaidInFull = invoiceIsPaidInFull(invoice)

    return (
        <Chip
            size={'small'}
            label={!isPaidInFull ? 'Outstanding' : 'Paid In Full'}
            variant={!isPaidInFull ? 'contained' : 'outlined'}
            color={!isPaidInFull ? 'secondary' : 'primary'}
        />
    )
}

PaidInFull.propTypes = {
    payments: PropTypes.object,
    balancePayable: PropTypes.number,
    total: PropTypes.number,
}

export const createInvoiceInitialValues = {
    customer: '',
    vehicleModel: '',
    vehicleRed: '',
    repairNotes: '',
}

export const createMotInvoiceInitialValues = {
    charged: 0,
    cash: 0,
    cheque: 0,
    card: 0,
    service: getDepartment('MOT').defaultServiceId,
}

export const invoiceTableColumns = [
    {
        name: 'Invoice No',
        selector: (row) => '#' + row?.autoId,
        sortable: true,
    },
    {
        name: 'Invoice Date',
        selector: (row) => `${dayjs(row.invoiceDate).format('DD MMM YYYY')}`,
        sortable: true,
    },
    {
        name: 'Customer',
        selector: (row) => row.customer.name,
        sortable: true,
    },
    {
        name: 'Vehicle Model - Reg ',
        selector: (row) => row.vehicleModel + ' - ' + row.vehicleReg?.toUpperCase(),
        sortable: true,
    },
    {
        name: 'Payment',
        cell: (row) => PaidInFull(row),
        selector: (row) => row.balancePayable,
        sortable: true,
    },
    {
        name: 'Actions',
        selector: (row) => InvoiceTableActions({ invoice: row }),
    },
]

export const miniInvoiceTableColumns = [
    {
        name: 'Invoice No',
        selector: (row) => '#' + row.autoId,
        sortable: true,
    },
    {
        name: 'Invoice Date',
        selector: (row) => `${dayjs(row.invoiceDate).format('DD MMM YYYY')}`,
        sortable: true,
    },
    {
        name: 'Vehicle Model - Reg ',
        selector: (row) => row.vehicleModel + ' - ' + row.vehicleReg?.toUpperCase(),
        sortable: true,
    },
    {
        name: 'Invoice Total',
        selector: (row) => row?.total?.toFixed(2),
        sortable: true,
    },
    {
        name: 'Payment',
        cell: (row) => PaidInFull(row),
        selector: (row) => row.balancePayable,
        sortable: true,
    },
    {
        name: '',
        cell: (row) => (
            <IconButton size="small" onClick={() => openTab(`/#/invoices/${row._id}/view`)}>
                <MuiIcon size="small" color="primary" name={'FolderOpen'} />
            </IconButton>
        ),
        sortable: false,
    },
]

export const invoiceLineTableColumns = [
    {
        name: 'Item',
        selector: (row) => row?.service?.title,
        sortable: false,
    },
    {
        name: 'Description',
        selector: (row) => row?.service?.description,
        sortable: false,
    },
    {
        name: 'VAT',
        selector: (row) => `£ ${row?.addVat ? (row.charged * 0.2).toFixed(2) : '0.00'}`,
    },
    {
        name: 'Amount',
        selector: (row) => `£ ${row.charged.toFixed(2)}`,
        sortable: false,
    },
    {
        name: 'Total',
        selector: (row) => `£ ${row?.addVat ? (row.charged * 1.2).toFixed(2) : row.charged}`,
    },
    {
        name: '',
        cell: ({ invoice, services, invoiceLines, _id, service, addVat, charged, description }) => (
            <>
                <MuiDrawer openButtonIcon={'Edit'} open={false}>
                    <UpdateInvoiceLineForm
                        invoice={invoice}
                        services={services}
                        invoiceLines={invoiceLines}
                        initialValues={{ _id, service: service?._id, addVat, charged, description }}
                    />
                </MuiDrawer>
                <DeleteInvoiceLine
                    invoice={invoice}
                    invoiceLines={invoiceLines}
                    line={{ _id, service: service?.title, addVat, charged, description }}
                />
            </>
        ),
    },
]

export const invoiceFormFields = (customers, pathname, isEdit = false) => {
    return [
        {
            component: 'MuiSelectField',
            name: 'department',
            label: 'Invoice Department',
            options: makeDropDownOptions(companyDetails.departments, 'name', 'name'),
            disabled: !invoiceSettings.useDepartments || isEdit || pathname === '/invoices/mot',
        },
        {
            component: 'MuiTextField',
            name: 'vehicleModel',
            label: 'Vehicle Model',
            size: {
                sm: 6,
                md: 6,
            },
        },
        {
            component: 'MuiTextField',
            name: 'vehicleReg',
            label: 'Vehicle Registration',
            size: {
                sm: 6,
                md: 6,
            },
        },
        {
            component: 'MuiSelectField',
            name: 'customer',
            label: 'Customer',
            options: makeCustomerSelectOptions(customers),
        },

        {
            component: 'MuiDatepicker',
            name: 'invoiceDate',
            label: 'Invoice Date',
        },
        {
            component: 'MuiTextField',
            name: 'repairNotes',
            label: 'Invoice/Repair/Service Notes',
            multiline: true,
            rows: 3,
        },
    ]
}

export const motInvoiceFields = (transactions = []) => [
    {
        component: 'MuiTextField',
        name: 'charged',
        label: 'MOT Amount',
        required: true,
    },
    ...invoicePaymentsFormFields(transactions),
]

export const invoiceLineFormFields = (services, department) => {
    return [
        {
            component: 'MuiSelectField',
            name: 'service',
            label: 'Service',
            options: makeServiceSelectionOptions(services),
        },
        {
            component: 'MuiTextField',
            name: 'description',
            label: 'Invoice/Repair/Service Notes',
            multiline: true,
            rows: 5,
        },
        {
            component: 'MuiTextField',
            name: 'charged',
            label: 'Amount Charged',
        },
        {
            component: 'MuiCheckBox',
            name: 'addVat',
            label: 'Amount Includes VAT (20%)',
            disable: department?.invoicesVatExempt,
        },
    ]
}

export const invoicePaymentsFormFields = (transactions = []) => {
    return [
        {
            component: 'MuiTextField',
            name: 'cash',
            label: 'Cash',
            size: {
                sm: 6,
                md: 6,
            },
        },
        {
            component: 'MuiTextField',
            name: 'cheque',
            label: 'Cheque',
            size: {
                sm: 6,
                md: 6,
            },
        },
        {
            component: 'MuiTextField',
            name: 'card',
            label: 'Card',
            size: {
                sm: 6,
                md: 6,
            },
        },
        {
            component: 'MuiTextField',
            name: 'reference',
            label: 'Reference',
            size: {
                sm: 6,
                md: 6,
            },
        },
        {
            component: 'MuiSelectField',
            name: 'transaction',
            options: transactions,
            label: 'Bank Transaction Ref',
        },
    ]
}

export const conditionalRowStyles = [
    {
        when: (row) => row.customer.highValue,
        style: (row) => ({
            backgroundColor: row.customer.highValue ? MuiPallete.accent.main : 'inherit',
        }),
    },
]

export const getInvoiceDepartment = (invoice) => {
    return companyDetails.departments.find(({ name }) => {
        return name === invoice?.department
    })
}
