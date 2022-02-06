import React from 'react'
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { createTransactionAction } from 'redux/transactions/actions'
import { FormBuilder } from 'components/common'
import { CreateTransactionSchema } from 'utils/validation'
import { transactionFormFields } from '../constants'
import dayjs from 'dayjs'

const Create = () => {
    const dispatch = useDispatch()
    return (
        <Box p={2}>
            <FormBuilder
                title="Create Transaction"
                initialValues={{
                    customerRef: '',
                    amount: '',
                    date: dayjs().format('MM/DD/YYYY'),
                    notes: '',
                }}
                validationSchema={CreateTransactionSchema}
                submitButtonText="Create Transaction"
                formFields={transactionFormFields}
                handleSubmit={(values) => {
                    dispatch(createTransactionAction(values))
                }}
            />
        </Box>
    )
}

Create.propTypes = {}

export default Create
