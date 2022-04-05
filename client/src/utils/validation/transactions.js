import * as Yup from 'yup'
import 'yup-phone'

export const CreateTransactionSchema = Yup.object().shape({
    customerRef: Yup.string().required('Transaction reference is required'),
    amount: Yup.number().required('Transaction amount is required'),
    date: Yup.string().required('Transaction date is required'),
})
