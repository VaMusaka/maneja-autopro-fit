import * as Yup from 'yup'
import 'yup-phone'

export const InviteUserSchema = Yup.object().shape({
    name: Yup.string().required('Full Name is Required'),
    phone: Yup.string().phone('GB', true, 'Invalid Mobile Phone').required(),
    email: Yup.string().email('Invalid Email').required('Email is Required'),
    password: Yup.string().required().min(12, 'Week password'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
})
