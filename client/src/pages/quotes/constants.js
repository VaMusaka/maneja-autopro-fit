import React from 'react'
import { IconButton } from '@mui/material'
import QuoteTableActions from './quoteTable/QuoteTableActions'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { makeCustomerSelectOptions, makeServiceSelectionOptions, openTab } from 'utils'
import MuiPallete from 'theme/palette'
import { companyDetails, invoiceSettings } from 'config'
import { MuiDrawer, MuiIcon } from 'components/common'
import UpdateQuoteLineForm from './viewQuote/UpdateQuoteLineForm'

dayjs.extend(relativeTime)

export const quoteTableColumns = [
    {
        name: 'Quote No',
        selector: (row) => '#' + row?.autoId,
        sortable: true,
    },
    {
        name: 'Quote Date',
        selector: (row) => `${dayjs(row.quoteDate).format('DD MMM YYYY')}`,
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
        name: 'Actions',
        selector: (row) => QuoteTableActions({ quote: row }),
    },
]

export const miniQuoteTableColumns = [
    {
        name: 'Quote No',
        selector: (row) => '#' + row.autoId,
        sortable: true,
    },
    {
        name: 'Quote Date',
        selector: (row) => `${dayjs(row.quoteDate).format('DD MMM YYYY')}`,
        sortable: true,
    },
    {
        name: 'Vehicle Model - Reg ',
        selector: (row) => row.vehicleModel + ' - ' + row.vehicleReg?.toUpperCase(),
        sortable: true,
    },
    {
        name: 'Quote Total',
        selector: (row) => row.total,
        sortable: true,
    },
    {
        nsme: '',
        cell: (row) => (
            <IconButton size="small" onClick={() => openTab(`/#/quotes/${row._id}/view`)}>
                <MuiIcon size="small" color="primary" name={'FolderOpen'} />
            </IconButton>
        ),
        sortable: false,
    },
]

export const quoteLineTableColumns = [
    {
        name: 'Item',
        selector: (row) => row?.service.title,
        sortable: false,
    },
    {
        name: 'Description',
        selector: (row) => row?.service.description,
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
        cell: ({ quote, services, quoteLines, _id, service, addVat, charged, description }) => (
            <>
                {!quote?.invoice?._id && (
                    <MuiDrawer openButtonIcon={'Edit'} open={false}>
                        <UpdateQuoteLineForm
                            quote={quote}
                            services={services}
                            quoteLines={quoteLines}
                            initialValues={{
                                _id,
                                service: service?._id,
                                addVat,
                                charged,
                                description,
                            }}
                        />
                    </MuiDrawer>
                )}
            </>
        ),
    },
]

export const quoteFormFields = (customers) => {
    return [
        {
            component: 'MuiSelectField',
            name: 'department',
            label: 'Quote Department',
            options: companyDetails.departments.map(({ name }) => {
                return { label: name, value: name }
            }),
            disabled: !invoiceSettings.useDepartments,
        },
        {
            component: 'MuiTextField',
            name: 'vehicleModel',
            label: 'Vehicle Model',
        },
        {
            component: 'MuiTextField',
            name: 'vehicleReg',
            label: 'Vehicle Registration',
        },
        {
            component: 'MuiSelectField',
            name: 'customer',
            label: 'Customer',
            options: makeCustomerSelectOptions(customers),
        },

        {
            component: 'MuiDatepicker',
            name: 'quoteDate',
            label: 'Quote Date',
        },
        {
            component: 'MuiTextField',
            name: 'quoteNotes',
            label: 'Quote/Repair/Service Notes',
            multiline: true,
            rows: 5,
        },
    ]
}

export const quoteLineFormFields = (services, department) => {
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
            label: 'Quote/Repair/Service Notes',
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

export const conditionalRowStyles = [
    {
        when: (row) => row.customer.highValue,
        style: (row) => ({
            backgroundColor: row.customer.highValue ? MuiPallete.accent.main : 'inherit',
        }),
    },
]

export const getQuoteDepartment = (quote) => {
    return companyDetails.departments.find((department) => {
        return department?.name === quote?.department
    })
}
