import * as Yup from 'yup'
import 'yup-phone'

export const ProductValidationSchema = Yup.object().shape({
    name: Yup.string().required('Product Name is required'),
    description: Yup.string().required('Product Description is required'),
    unitPrice: Yup.number(),
    unit: Yup.string(),
})
