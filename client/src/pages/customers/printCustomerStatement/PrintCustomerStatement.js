import React from 'react'
import CustomerStatementPDF from './CustomerStatementPDF'
import PropTypes from 'prop-types'

const PrintCustomerStatement = ({ invoices, customer, department }) => (
    <CustomerStatementPDF invoices={invoices} customer={customer} department={department} />
)

PrintCustomerStatement.propTypes = {
    invoices: PropTypes.array,
    customer: PropTypes.object,
    department: PropTypes.string,
}
export default PrintCustomerStatement
