import * as Yup from 'yup'
import 'yup-phone'

export const PurchaseValidationSchema = Yup.object().shape({
    invoicedTo: Yup.string().required('Required'),
    details: Yup.string().required('Required'),
    warranty: Yup.string(),
    amount: Yup.number().required('Required'),
    vat: Yup.number(),
    total: Yup.number().required('Required'),
    supplierInvoiceNumber: Yup.string().required('Required'),
    supplierInvoiceDate: Yup.string().required('Required'),
    supplier: Yup.string().required('Required'),
    purchaseCategory: Yup.string().required('Required'),
    invoiceLinesCount: Yup.number(),
    invoiceLinesBilled: Yup.number(),
    invoiceLinesDelivered: Yup.number(),
})
