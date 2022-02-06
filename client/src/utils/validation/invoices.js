import * as Yup from 'yup'
import 'yup-phone'

export const InvoiceValidationSchema = Yup.object().shape({
    customer: Yup.string().required('Customer is Required'),
    vehicleModel: Yup.string().min(1).max(64).required('Vehicle Model is Required'),
    vehicleReg: Yup.string().min(3).max(15).required('Vehicle Reg is Required'),
    repairNotes: Yup.string(),
})

export const CreateInvoiceLineSchema = Yup.object().shape({
    service: Yup.string().required('Select Invoice Line Service'),
    description: Yup.string(),
    charged: Yup.number(),
    addVat: Yup.boolean(),
})

export const CreateInvoicePaymentSchema = Yup.object().shape({
    card: Yup.number(),
    cash: Yup.number(),
    cheque: Yup.number(),
    reference: Yup.string(),
})
