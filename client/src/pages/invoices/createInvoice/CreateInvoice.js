import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { customersSelector, transactionsSelector } from 'redux/selectors'
import { createInvoiceAction } from 'redux/invoices/actions'
import { InvoiceValidationSchema, MotInvoiceValidationSchema } from 'utils/validation'
import { FormBuilder } from 'components/common'
import {
    createInvoiceInitialValues,
    createMotInvoiceInitialValues,
    invoiceFormFields,
    motInvoiceFields,
} from 'pages/invoices/constants'
import { getCustomersAction } from 'redux/customers/actions'
import { useHistory, useLocation } from 'react-router-dom'
import { companyDetails } from 'config'
import { getTransactionsAction } from '../../../redux/transactions/actions'

const Create = () => {
    const [transactionOptions, setTransactionOptions] = useState([])

    const { pathname } = useLocation()
    const history = useHistory()
    const dispatch = useDispatch()
    const CUSTOMERS = useSelector(customersSelector)
    const { transactions, loading } = useSelector(transactionsSelector)

    useEffect(() => {
        if (!transactions && !loading) {
            dispatch(getTransactionsAction({ department: 'MOT' }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (transactions && !loading) {
            const options = transactions.map(({ _id, customerRef, autoId }) => {
                return { value: _id, label: `${customerRef}  [#${autoId}]` }
            })
            setTransactionOptions(options)
        }
    }, [loading, transactions])

    const { customers } = CUSTOMERS
    const isLoading = CUSTOMERS.loading || loading

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

    const formDetails =
        pathname !== '/invoices/mot'
            ? {
                  title: 'Create Invoice',
                  initialValues: {
                      ...createInvoiceInitialValues,
                      department: department(),
                  },
                  formFields: invoiceFormFields(customers, pathname),
                  validationSchema: InvoiceValidationSchema,
                  handleSubmit: (values) => dispatch(createInvoiceAction(values, history)),
              }
            : {
                  title: 'Create MOT Invoice',
                  initialValues: {
                      ...createInvoiceInitialValues,
                      ...createMotInvoiceInitialValues,
                      department: department(),
                  },
                  formFields: [
                      ...invoiceFormFields(customers, pathname),
                      ...motInvoiceFields(transactionOptions),
                  ],
                  validationSchema: MotInvoiceValidationSchema,
                  handleSubmit: (values) => dispatch(createInvoiceAction(values, history, true)),
              }

    return (
        <Box p={1}>
            <FormBuilder
                title={formDetails.title}
                initialValues={formDetails.initialValues}
                validationSchema={formDetails.validationSchema}
                submitButtonText={formDetails.title}
                formFields={formDetails.formFields}
                handleSubmit={formDetails.handleSubmit}
            />
        </Box>
    )
}

Create.propTypes = {}

export default Create
