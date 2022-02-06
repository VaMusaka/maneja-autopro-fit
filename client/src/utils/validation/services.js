import * as Yup from 'yup'
import 'yup-phone'

export const CreateServiceSchema = Yup.object().shape({
    title: Yup.string().required('Service Name is required'),
    description: Yup.string().required('Service Description is required').min(32),
    unitPrice: Yup.number(),
    unit: Yup.string(),
})
