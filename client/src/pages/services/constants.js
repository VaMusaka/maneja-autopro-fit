import ServiceTableActions from './serviceTable/ServiceTableActions'
import dayjs from 'dayjs'

export const serviceTableColumns = [
    {
        name: 'Name',
        selector: (row) => row.title,
        sortable: true,
    },
    {
        name: 'Description',
        selector: (row) => row.description,
        sortable: true,
    },
    {
        name: 'Unit Price',
        selector: (row) => row.unitPrice,
        sortable: true,
    },
    {
        name: 'Unit Measure',
        selector: (row) => row.unit,
        sortable: true,
    },
    {
        name: 'Created',
        selector: (row) => dayjs(row.created).format('DD MMM YYYY'),
        sortable: true,
    },
    {
        name: 'Actions',
        selector: (row) => ServiceTableActions(row),
    },
]

export const serviceFormFields = [
    {
        component: 'MuiTextField',
        name: 'title',
        label: 'Name',
    },
    {
        component: 'MuiTextField',
        name: 'description',
        label: 'Description',
        multiline: true,
        rows: 5,
    },
    {
        component: 'MuiTextField',
        name: 'unitPrice',
        label: 'Unit Price',
    },
    {
        component: 'MuiSelectField',
        name: 'unit',
        label: 'Unit measure',
        options: [
            { label: 'Single', value: 'item' },
            { label: 'Hourly', value: 'hourly' },
            { label: 'General', value: 'general' },
        ],
    },
    {
        component: 'MuiCheckBox',
        name: 'chargeVat',
        label: 'Force Charge VAT',
    },
]
