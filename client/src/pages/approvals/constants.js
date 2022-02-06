import ApprovedCheckbox from './columnInput/ApprovedCheckbox'
import ApprovedChip from './columnViews/ApprovedChip'
import CustomerSelect from './columnInput/CustomerSelect'
import ApprovalCustomer from './columnViews/ApprovalCustomer'
import ServiceSelect from './columnInput/ServiceSelect'
import ApprovalService from './columnViews/ApprovalService'
import PaymentMethod from './columnViews/PaymentMethod'

const oldCustomerColumn = ({ data }) => {
    return `${data?.invoiceCustomer?.name} - ${data?.invoiceCustomer?.email}`
}

export const approvalDetailsColumns = [
    {
        field: 'status',
        headerName: 'Approved',
        editable: true,
        cellRenderer: 'approvedStatus',
        isPopup: true,
        cellEditor: 'approvedCheckbox',
        width: 130,
    },
    {
        field: 'notes',
        headerName: 'Notes',
        editable: true,
        isPopup: true,
        width: 150,
    },
    {
        field: 'customer',
        headerName: 'New Customer',
        editable: true,
        cellEditor: 'customerSelect',
        cellRenderer: 'approvalCustomer',
    },
    {
        field: 'repair',
        headerName: 'New Service/Repair',
        editable: true,
        cellEditor: 'serviceSelect',
        cellRenderer: 'approvalService',
    },
    {
        field: 'amount',
        headerName: 'Amount',
        editable: true,
        width: 110,
    },
    {
        field: 'total',
        headerName: 'Total (+VAT)',
        width: 110,
    },
    {
        field: 'payments.amount',
        headerName: 'New Amount Paid',
        editable: true,
    },
    {
        field: 'payments.method',
        headerName: 'Payment Method',
        editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: { cellHeight: 50, values: ['Cash', 'Card', 'Cheque', 'BACS'] },
    },
    {
        field: 'reference',
        headerName: 'Reference',
    },
    {
        field: 'letter',
        headerName: 'Letter (A-Z)',
        editable: true,
    },
]

export const invoiceDetailsColumns = [
    {
        field: 'invoice.autoId',
        headerName: 'Sales ID',
        sortable: true,
        filter: true,
        floatingFilter: true,
        width: 120,
    },
    {
        field: 'invoiceCustomer.email',
        headerName: 'Customer',
        sortable: true,
        filter: true,
        floatingFilter: true,
        cellRenderer: oldCustomerColumn,
        columnGroupShow: 'open',
        width: 150,
    },
    {
        field: 'invoice.vehicleReg',
        headerName: 'Reg',
        sortable: true,
        filter: true,
        floatingFilter: true,
        columnGroupShow: 'open',
        width: 150,
    },
    {
        field: 'invoice.vehicleModel',
        headerName: 'Model',
        sortable: true,
        filter: true,
        floatingFilter: true,
        columnGroupShow: 'open',
        width: 150,
    },
    {
        field: 'invoice.total',
        headerName: 'Amount',
        sortable: true,
        filter: true,
        floatingFilter: true,
        width: 110,
    },
    {
        field: 'invoiceTotalPaid',
        headerName: 'Total',
        sortable: true,
        filter: true,
        floatingFilter: true,
        columnGroupShow: 'open',
        width: 110,
    },
    {
        field: 'invoice.payments',
        headerName: 'Payment Method',
        sortable: false,
        filter: false,
        columnGroupShow: 'open',
        cellRenderer: 'paymentMethod',
        width: 110,
    },
]

export const invoiceLineColumns = [
    {
        field: 'service',
        headerName: 'Service',
        cellRenderer: 'approvalService',
        // width: 400,
    },
    {
        field: 'description',
        headerName: 'Description',
        // width: 500,
    },
    {
        field: 'charged',
        headerName: '(£) Amount',
    },
    {
        field: 'charged',
        headerName: '(£) VAT',
        cellRenderer: 'invoiceLineVat',
    },
    {
        field: 'charged',
        headerName: '(£) Total',
        cellRenderer: 'invoiceLineTotal',
    },
]

export const purchaseDetailsColumns = [
    {
        field: 'autoId',
        headerName: 'Purchases ID',
        sortable: true,
        filter: true,
        width: 120,
    },
    {
        field: 'approved',
        headerName: 'Approved',
        editable: true,
        cellRenderer: 'approvedStatus',
        isPopup: true,
        cellEditor: 'approvedCheckbox',
        width: 130,
    },
    {
        field: 'supplierInvoiceNumber',
        headerName: 'Invoice #',
        sortable: true,
        filter: true,
        width: 130,
    },
    {
        field: 'supplier',
        headerName: 'Supplier',
        cellRenderer: 'purchaseSupplier',
        sortable: true,
        filter: true,
        width: 130,
    },
    {
        field: 'details',
        headerName: 'Description',
        sortable: true,
        filter: true,
    },
    {
        field: 'supplierInvoiceDate',
        headerName: 'Invoice Date',
        cellRenderer: 'purchaseInvoiceDate',
        sortable: true,
        filter: true,
        width: 130,
    },
    {
        field: 'amount',
        headerName: 'Sub Total',
        sortable: true,
        filter: true,
        width: 130,
    },
    {
        field: 'vat',
        headerName: 'VAT',
        sortable: true,
        filter: true,
        width: 130,
    },
    {
        field: 'total',
        headerName: 'Total',
        sortable: true,
        filter: true,
        width: 130,
    },
    {
        field: 'invoiceLines.billed',
        headerName: '# Invoiced',
        sortable: true,
        filter: true,
        width: 100,
    },
    {
        field: 'invoiceLines.delivered',
        headerName: '# Delivered',
        sortable: true,
        filter: true,
        width: 100,
    },
    {
        field: 'invoiceLines.count',
        headerName: '# Ordered',
        sortable: true,
        filter: true,
        width: 100,
    },
]

export const columnGroups = [
    {
        headerName: 'Invoice Details',
        columns: invoiceDetailsColumns,
    },
    {
        headerName: 'Approval Details',
        columns: approvalDetailsColumns,
    },
]

export const frameworkComponents = {
    approvedCheckbox: ApprovedCheckbox,
    approvedStatus: ApprovedChip,
    customerSelect: CustomerSelect,
    approvalCustomer: ApprovalCustomer,
    serviceSelect: ServiceSelect,
    approvalService: ApprovalService,
    paymentMethod: PaymentMethod,
}
