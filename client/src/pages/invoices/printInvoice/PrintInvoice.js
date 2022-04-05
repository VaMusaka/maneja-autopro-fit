import React from 'react'
import InvoicePdf from './InvoicePDF'
import PropTypes from 'prop-types'

const PrintInvoice = ({ invoice }) => <InvoicePdf invoice={invoice} />

PrintInvoice.propTypes = {
    invoice: PropTypes.object,
}
export default PrintInvoice
