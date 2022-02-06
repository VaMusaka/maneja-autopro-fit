import * as Yup from 'yup'

export const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Email is Required'),
    password: Yup.string().min(12, 'Password must be more than 12 Characters long.'),
})

export const RequestPasswordResetSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Email is Required'),
})

export const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Email is Required'),
    password: Yup.string().min(12, 'Password must be more than 12 Characters long.'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
})
