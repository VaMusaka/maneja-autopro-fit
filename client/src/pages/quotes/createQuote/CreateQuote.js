import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { customersSelector } from 'redux/selectors'
import { createQuoteAction } from 'redux/quotes/actions'
import { InvoiceValidationSchema } from 'utils/validation'
import { FormBuilder } from 'components/common'
import { quoteFormFields } from 'pages/quotes/constants'
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
                title="Create Quote"
                initialValues={{
                    customer: '',
                    vehicleModel: '',
                    vehicleRed: '',
                    quoteNotes: '',
                    department: companyDetails.departments[0].name,
                }}
                validationSchema={InvoiceValidationSchema}
                submitButtonText="Create Quote"
                formFields={quoteFormFields(customers)}
                handleSubmit={(values) => {
                    dispatch(createQuoteAction(values, history))
                }}
            />
        </Box>
    )
}

Create.propTypes = {}

export default Create
