import CustomerTableActions from './customerTable/CustomerTableActions'
import MuiPallete from 'theme/palette'

export const customerTableColumns = [
    {
        name: '#Id',
        selector: (row) => `# ${row.autoId}`,
        sortable: true,
    },
    {
        name: 'Name',
        selector: (row) => row.name,
        sortable: true,
    },
    {
        name: 'Email',
        selector: (row) => row.email,
        sortable: true,
    },
    {
        name: 'Town',
        selector: (row) => row.town,
        sortable: true,
    },
    {
        name: 'Phone',
        selector: (row) => row.phone,
        sortable: true,
    },
    {
        name: 'Type',
        selector: (row) => row.customerType,
        sortable: true,
    },
    {
        name: 'Actions',
        selector: (row) => CustomerTableActions(row),
    },
]

export const customerFormFields = [
    {
        component: 'MuiTextField',
        name: 'name',
        label: 'Full Name',
    },
    {
        component: 'MuiTextField',
        name: 'email',
        label: 'Customer Email',
    },
    {
        component: 'MuiTextField',
        name: 'phone',
        label: 'Customer Phone',
    },
    {
        component: 'MuiTextField',
        name: 'addressLine1',
        label: 'Address Line 1',
    },
    {
        component: 'MuiTextField',
        name: 'addressLine2',
        label: 'Address Line 2',
    },
    {
        component: 'MuiTextField',
        name: 'town',
        label: 'Town',
    },
    {
        component: 'MuiTextField',
        name: 'postalCode',
        label: 'Post Code',
    },
    {
        component: 'MuiCheckBox',
        name: 'creditAccount',
        label: 'Credit Account',
        size: { md: 6, sm: 6, xs: 12 },
    },
    {
        component: 'MuiCheckBox',
        name: 'highValue',
        label: 'High Value',
        size: { md: 6, sm: 6, xs: 12 },
    },
    {
        component: 'MuiSelectField',
        name: 'customerType',
        label: 'Customer Type',
        options: [
            { value: 'Private', label: 'Private' },
            { value: 'Trade', label: 'Trade' },
        ],
    },
    {
        component: 'MuiSelectField',
        name: 'paymentTerms',
        label: 'Payment Terms',
        options: [
            { value: '7 Days', label: '7 Days' },
            { value: '14 Days', label: '14 Days' },
            { value: '28 Days', label: '28 Days' },
        ],
    },
]

export const conditionalRowStyles = [
    {
        when: (row) => row.highValue,
        style: (row) => ({
            backgroundColor: row.highValue ? MuiPallete.accent.main : 'inherit',
        }),
    },
]
