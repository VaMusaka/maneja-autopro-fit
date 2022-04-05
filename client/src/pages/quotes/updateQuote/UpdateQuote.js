import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { customersSelector } from 'redux/selectors'
import { updateQuoteAction } from 'redux/quotes/actions'
import { InvoiceValidationSchema } from 'utils/validation'
import { FormBuilder } from 'components/common'
import { quoteFormFields } from 'pages/quotes/constants'
import { getCustomersAction } from 'redux/customers/actions'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

const Update = ({ quote }) => {
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
                title="Update Quote"
                initialValues={{ ...quote, customer: quote.customer._id }}
                validationSchema={InvoiceValidationSchema}
                submitButtonText="Update Quote"
                formFields={quoteFormFields(customers)}
                handleSubmit={(values) => {
                    dispatch(updateQuoteAction(values, history))
                }}
            />
        </Box>
    )
}

Update.propTypes = {
    quote: PropTypes.object.isRequired,
}

export default Update
