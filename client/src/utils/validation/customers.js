import * as Yup from 'yup'
import 'yup-phone'
import { isPostalCode } from 'validator'
import { phone } from 'phone'
import { isUkPhone } from 'utils'

export const CustomerValidationSchema = Yup.object().shape({
    name: Yup.string().required('Full Name is Required'),
    phone: Yup.string()
        .test('phone', 'Invalid Phone Number', (value = '') => {
            const { isValid } = phone(value, { country: 'GB' })
            return isValid || isUkPhone(value)
        })
        .required(),
    email: Yup.string().email('Invalid Email').required('Email is Required'),
    postalCode: Yup.string().test('postalCode', 'Invalid Post Code ', (value) =>
        isPostalCode(String(value), ['GB'])
    ),
})
