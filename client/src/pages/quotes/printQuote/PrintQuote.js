import React from 'react'
import QuotePdf from './QuotePDF'
import PropTypes from 'prop-types'

const PrintQuote = ({ quote }) => <QuotePdf quote={quote} />

PrintQuote.propTypes = {
    quote: PropTypes.object,
}
export default PrintQuote
