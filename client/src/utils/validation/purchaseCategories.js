import * as Yup from 'yup'
import 'yup-phone'

export const CreatePurchaseCategorySchema = Yup.object().shape({
    name: Yup.string().required('Purchase Category Name is required'),
    description: Yup.string().required('Purchase Category Description is required'),
})
