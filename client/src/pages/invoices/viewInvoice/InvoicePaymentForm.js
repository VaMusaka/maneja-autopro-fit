import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@mui/material'
import { FormBuilder, MuiDrawer } from 'components/common'
import { createInvoicePaymentsAction } from 'redux/invoices/actions'
import { getTransactionsAction } from 'redux/transactions/actions'
import { transactionsSelector } from 'redux/selectors'
import { MuiStyles } from 'theme'
import { invoicePaymentsFormFields } from '../constants'
import { CreateInvoicePaymentSchema } from 'utils/validation'
import PropTypes from 'prop-types'
import clsx from 'clsx'

const InvoicePaymentForm = ({ invoice }) => {
    const [transactionOptions, setTransactionOptions] = useState(null)
    const dispatch = useDispatch()
    const classes = MuiStyles()

    const { transactions, loading } = useSelector(transactionsSelector)

    useEffect(() => {
        if (!loading) {
            dispatch(getTransactionsAction({ department: invoice?.department }))
        }
    }, [])

    useEffect(() => {
        if (transactions && !loading) {
            const options = transactions.map(({ _id, customerRef, autoId }) => {
                return { value: _id, label: `${customerRef}  [#${autoId}]` }
            })
            setTransactionOptions(options)
        }
    }, [loading, transactions])

    if (loading) {
        return ''
    }

    return (
        <Box className={clsx(classes.pt2)} display={'flex'} justifyContent={'flex-end'}>
            <MuiDrawer
                openButtonText={invoice.payments.paidInFull ? 'UPDATE PAYMENTS' : 'ADD PAYMENTS'}
            >
                <FormBuilder
                    title={'Invoice Payments'}
                    initialValues={{
                        _id: invoice._id,
                        card: invoice.payments.card || 0,
                        cash: invoice.payments.cash || 0,
                        cheque: invoice.payments.cheque || 0,
                        reference: invoice?.payments?.reference || '',
                        transaction: invoice?.payments?.transaction || '',
                    }}
                    formFields={invoicePaymentsFormFields(transactionOptions)}
                    validationSchema={CreateInvoicePaymentSchema}
                    handleSubmit={(values) => dispatch(createInvoicePaymentsAction(values))}
                />
            </MuiDrawer>
        </Box>
    )
}

InvoicePaymentForm.propTypes = {
    invoice: PropTypes.object,
}

export default InvoicePaymentForm
