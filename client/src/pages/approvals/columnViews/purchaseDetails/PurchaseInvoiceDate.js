import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

// eslint-disable-next-line react/display-name
const PurchaseInvoiceDate = ({ value }) => {
    const [invoiceDate, setInvoiceDate] = useState(null)

    const getPurchaseInvoiceDate = () => {
        const invoiceDate = dayjs(value).format('DD/MM/YYYY')
        setInvoiceDate(invoiceDate)
    }

    useEffect(() => {
        getPurchaseInvoiceDate()
        //eslint-disable-next-line
    }, [])

    return <>{invoiceDate}</>
}

PurchaseInvoiceDate.propTypes = {
    value: PropTypes.array.isRequired,
}
export default PurchaseInvoiceDate
