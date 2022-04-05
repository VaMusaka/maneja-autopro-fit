import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { customersSelector } from 'redux/selectors'
import { createInvoiceAction } from 'redux/invoices/actions'
import { InvoiceValidationSchema } from 'utils/validation'
import { FormBuilder } from 'components/common'
import { invoiceFormFields } from 'pages/invoices/constants'
import { getCustomersAction } from 'redux/customers/actions'
import { useHistory } from 'react-router-dom'
import { companyDetails } from 'config'

const Create = () => {
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

    return (
        <Box p={1}>
            <FormBuilder
                title="Create Invoice"
                initialValues={{
                    customer: '',
                    vehicleModel: '',
                    vehicleRed: '',
                    repairNotes: '',
                    department: companyDetails.departments[0].name,
                }}
                validationSchema={InvoiceValidationSchema}
                submitButtonText="Create Invoice"
                formFields={invoiceFormFields(customers)}
                handleSubmit={(values) => {
                    dispatch(createInvoiceAction(values, history))
                }}
            />
        </Box>
    )
}

Create.propTypes = {}

export default Create
