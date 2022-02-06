import React from 'react'
import PropTypes from 'prop-types'
import { MuiAccordion } from 'components/common'
import InvoicesTable from './InvoiceTable'

const DayTable = ({ invoicesByDate }) => {
    const accordionBreakdown = invoicesByDate.map(({ _id, invoices }) => {
        return {
            key: _id,
            isDisabled: invoices?.length === 0,
            title: _id,
            details: InvoicesTable({ invoices }),
        }
    })

    return <MuiAccordion items={accordionBreakdown} />
}

DayTable.propTypes = {
    invoicesByDate: PropTypes.array.isRequired,
}

export default DayTable
