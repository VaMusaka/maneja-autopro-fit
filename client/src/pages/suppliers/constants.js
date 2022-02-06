import SupplierTableActions from './supplierTable/SupplierTableActions'

export const supplierTableColumns = [
    {
        name: '#Id',
        selector: (row) => `# ${row?.autoId}`,
        sortable: true,
    },
    {
        name: 'Name',
        selector: (row) => row.name,
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
        name: 'Actions',
        selector: (row) => SupplierTableActions(row),
    },
]
export const supplierFormFields = [
    {
        component: 'MuiTextField',
        name: 'name',
        label: 'Name',
    },
    {
        component: 'MuiTextField',
        name: 'email',
        label: 'Email',
    },
    {
        component: 'MuiTextField',
        name: 'phone',
        label: 'Phone',
    },
    {
        component: 'MuiTextField',
        name: 'town',
        label: 'Location (Town/City)',
    },
]
