import * as Yup from 'yup'
import 'yup-phone'

export const SupplierValidationSchema = Yup.object().shape({
    name: Yup.string().required('Full Name is Required'),
    town: Yup.string(),
    phone: Yup.string(),
    email: Yup.string(),
})
