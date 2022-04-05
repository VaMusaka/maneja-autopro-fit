import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Divider, Typography } from '@mui/material'
import { MuiStyles } from 'theme'
import clsx from 'clsx'
import { invoiceAmountPaid, reduceToTotal } from 'utils'
import { createInvoicePaymentsAction } from 'redux/invoices/actions'
import { FormBuilder, MuiDrawer } from 'components/common'
import { invoicePaymentsFormFields } from '../constants'
import { CreateInvoicePaymentSchema } from 'utils/validation'
import { transactionsSelector } from '../../../redux/selectors'
import { getTransactionsAction } from '../../../redux/transactions/actions'

const AmountRow = ({ title, amount }) => {
    const classes = MuiStyles()
    return (
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} height={30}>
            <Typography variant={'subtitle1'}>{title}</Typography>
            <Typography variant={'body1'} className={classes.fw8}>
                £ {amount}
            </Typography>
        </Box>
    )
}

const PricingFooter = ({ invoice }) => {
    const [transactionOptions, setTransactionOptions] = useState(null)

    const dispatch = useDispatch()
    const classes = MuiStyles()

    const { transactions, loading } = useSelector(transactionsSelector)

    useEffect(() => {
        if (!transactions && !loading) {
            dispatch(getTransactionsAction({ department: invoice?.department }))
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

    if (loading) {
        return ''
    }

    const amountPaid = invoiceAmountPaid({ payments: invoice?.payments || {} })
    const partsTotal = reduceToTotal(invoice?.purchases, 'total')

    return (
        <Box className={clsx(classes.pt2)} width={250}>
            <AmountRow title={'Sub Total'} amount={invoice?.subTotal?.toFixed(2) || 0.0} />
            <AmountRow title={'VAT'} amount={invoice?.vatAmount?.toFixed(2) || 0.0} />
            <AmountRow title={'Parts'} amount={partsTotal?.toFixed(2) || 0.0} />
            <AmountRow title={'Total'} amount={invoice?.total?.toFixed(2) || 0.0} />
            <Divider />
            <AmountRow title={'Paid'} amount={amountPaid.toFixed(2) || 0.0} />
            <AmountRow amount={invoice.balancePayable.toFixed(2)} title={'Outstanding Balance'} />

            <Box className={clsx(classes.pt2)} display={'flex'} justifyContent={'flex-end'}>
                <MuiDrawer
                    openButtonText={
                        invoice.payments.paidInFull ? 'UPDATE PAYMENTS' : 'ADD PAYMENTS'
                    }
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
        </Box>
    )
}

PricingFooter.propTypes = {
    invoice: PropTypes.object.isRequired,
}

AmountRow.propTypes = {
    title: PropTypes.string.isRequired,
    amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}
export default PricingFooter
