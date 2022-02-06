import React from 'react'
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { updateTransactionAction } from 'redux/transactions/actions'
import { FormBuilder } from 'components/common'
import { CreateTransactionSchema } from 'utils/validation'
import { transactionFormFields } from '../constants'
import PropTypes from 'prop-types'

const Create = ({ transaction }) => {
    const dispatch = useDispatch()
    return (
        <Box p={2}>
            <FormBuilder
                title="Update Transaction"
                initialValues={transaction}
                validationSchema={CreateTransactionSchema}
                submitButtonText="Update Transaction"
                formFields={transactionFormFields}
                handleSubmit={(values) => {
                    dispatch(updateTransactionAction(values))
                }}
            />
        </Box>
    )
}

Create.propTypes = {
    transaction: PropTypes.object.isRequired,
}

export default Create
