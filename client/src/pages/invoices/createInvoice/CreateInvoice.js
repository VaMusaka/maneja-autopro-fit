import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { customersSelector } from 'redux/selectors'
import { createInvoiceAction } from 'redux/invoices/actions'
import { InvoiceValidationSchema } from 'utils/validation'
import { FormBuilder } from 'components/common'
import { createInvoiceInitialValues, invoiceFormFields } from 'pages/invoices/constants'
import { getCustomersAction } from 'redux/customers/actions'
import { useHistory, useLocation } from 'react-router-dom'
import { companyDetails } from 'config'

const Create = () => {
    const { pathname } = useLocation()
    const history = useHistory()
    const dispatch = useDispatch()
    const CUSTOMERS = useSelector(customersSelector)

    const { customers } = CUSTOMERS
    const isLoading = CUSTOMERS.loading

    useEffect(() => {
        if (!customers) {
            dispatch(getCustomersAction())
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (isLoading) {
        return 'LOADING'
    }

    const department = () => {
        if (pathname === '/invoices') {
            return companyDetails.departments[0].name
        }

        return companyDetails.departments[1].name
    }

    return (
        <Box p={1}>
            <FormBuilder
                title="Create Invoice"
                initialValues={{
                    ...createInvoiceInitialValues,
                    department: department(),
                }}
                validationSchema={InvoiceValidationSchema}
                submitButtonText="Create Invoice"
                formFields={invoiceFormFields(customers, pathname)}
                handleSubmit={(values) => {
                    dispatch(createInvoiceAction(values, history))
                }}
            />
        </Box>
    )
}

Create.propTypes = {}

export default Create
