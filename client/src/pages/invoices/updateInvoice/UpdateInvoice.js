import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { customersSelector } from 'redux/selectors'
import { updateInvoiceAction } from 'redux/invoices/actions'
import { InvoiceValidationSchema } from 'utils/validation'
import { FormBuilder } from 'components/common'
import { invoiceFormFields } from 'pages/invoices/constants'
import { getCustomersAction } from 'redux/customers/actions'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

const Update = ({ invoice }) => {
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

    const { _id, department, vehicleModel, vehicleReg, invoiceDate, repairNotes } = invoice

    return (
        <Box p={1}>
            <FormBuilder
                title="Update Invoice"
                initialValues={{
                    _id,
                    department,
                    vehicleModel,
                    vehicleReg,
                    invoiceDate,
                    repairNotes,
                    customer: invoice.customer._id,
                }}
                validationSchema={InvoiceValidationSchema}
                submitButtonText="Update Invoice"
                formFields={invoiceFormFields(customers)}
                handleSubmit={(values) => {
                    dispatch(updateInvoiceAction(values, history))
                }}
            />
        </Box>
    )
}

Update.propTypes = {
    invoice: PropTypes.object.isRequired,
}

export default Update
