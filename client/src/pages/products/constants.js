import ProductsTableActions from './productsTable/ProductsTableActions'
import dayjs from 'dayjs'

export const productsTableColumns = [
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
        name: 'Unit Price',
        selector: (row) => row?.unitPrice,
        sortable: true,
    },
    {
        name: 'Unit',
        selector: (row) => row?.unit,
        sortable: true,
    },
    {
        name: 'Purchase Category',
        selector: (row) => row?.purchaseCategory?.name,
        sortable: true,
    },
    {
        name: 'Default Supplier',
        selector: (row) => row?.supplier?.name,
        sortable: true,
    },
    {
        name: 'Created',
        selector: (row) => dayjs(row.created).format('DD MMM YYYY'),
        sortable: true,
    },
    {
        name: 'Actions',
        selector: (row) => ProductsTableActions(row),
        width: '170px',
    },
]

export const productFormFields = (purchaseCategoryOptions, suppliersOptions) => {
    return [
        {
            component: 'MuiTextField',
            name: 'name',
            label: 'Name',
        },
        {
            component: 'MuiSelectField',
            name: 'purchaseCategory',
            label: 'Purchase Category',
            options: purchaseCategoryOptions,
        },
        {
            component: 'MuiSelectField',
            name: 'supplier',
            label: 'Default Supplier',
            options: suppliersOptions,
        },
        {
            component: 'MuiSelectField',
            name: 'unit',
            label: 'Unit of measure',
            options: [
                { label: 'Single Item', value: 'item' },
                { label: 'KG', value: 'Kg' },
                { label: 'Litres', value: 'Ltr' },
                { label: 'Meters', value: 'meter' },
                { label: 'Square Meters', value: 'square meter' },
                { label: 'Ounce', value: 'ounce' },
                { label: 'Pounds', value: 'pound' },
            ],
        },
        {
            component: 'MuiTextField',
            name: 'unitPrice',
            label: 'Unit Price (£)',
            type: 'number',
        },
        {
            component: 'MuiTextField',
            name: 'description',
            label: 'Description',
            multiline: true,
            rows: 5,
        },
    ]
}
