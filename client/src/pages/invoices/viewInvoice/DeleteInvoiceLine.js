import React from 'react'
import { MuiDialog } from 'components/common'
import { useDispatch } from 'react-redux'

import PropTypes from 'prop-types'

import { updateInvoiceLineAction } from 'redux/invoices/actions'

const UpdateInvoiceLineForm = ({ invoice, invoiceLines, line }) => {
    const dispatch = useDispatch()

    const handleDeleteInvoiceLines = (value) => {
        let lines = invoiceLines?.filter(({ _id }) => _id !== value)

        lines = lines?.map((line) => {
            line.service = line?.service?._id
            delete line._id
            return line
        })
        dispatch(updateInvoiceLineAction({ _id: invoice?._id, lines }))
    }

    return (
        <MuiDialog
            handleConfirm={() => handleDeleteInvoiceLines(line._id)}
            ActionButton={{ icon: 'Delete' }}
            title={'Delete Invoice Line'}
            content={
                <>
                    Confirm delete invoice line, <b>{line.service}</b> for{' '}
                    <b>£ {line.charged.toFixed(2)}</b>.
                    <br /> This process <b>can not</b> be reversed
                </>
            }
        />
    )
}
UpdateInvoiceLineForm.propTypes = {
    invoice: PropTypes.object.isRequired,
    invoiceLines: PropTypes.array,
    line: PropTypes.object,
}

export default UpdateInvoiceLineForm
