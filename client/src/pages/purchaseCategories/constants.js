import PurchaseCategoryTableActions from './purchaseCategoryTable/PurchaseCategoryTableActions'
import dayjs from 'dayjs'

export const purchaseTableColumns = [
    {
        name: 'Name',
        selector: (row) => row.name,
        sortable: true,
    },
    {
        name: 'Description',
        selector: (row) => row.description,
        sortable: true,
    },
    {
        name: 'Created',
        selector: (row) => dayjs(row.created_at).format('DD MMM YYYY'),
        sortable: true,
    },
    {
        name: 'Actions',
        selector: (row) => PurchaseCategoryTableActions(row),
    },
]

export const purchaseCategoryFormFields = [
    {
        component: 'MuiTextField',
        name: 'name',
        label: 'Name',
    },
    {
        component: 'MuiTextField',
        name: 'description',
        label: 'Description',
        multiline: true,
        rows: 5,
    },
]
