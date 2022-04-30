import React, { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

// eslint-disable-next-line react/display-name
const InvoiceLineVat = forwardRef(({ data, value }, ref) => {
    const [vat, setVat] = useState(data.addVat ? value * 0.2 : 0.0)

    useImperativeHandle(ref, () => {
        return {
            refresh({ data, value }) {
                setVat(data.addVat ? value * 0.2 : 0.0)
            },
        }
    })

    return <div>£ {vat.toFixed(2)}</div>
})

InvoiceLineVat.propTypes = {
    value: PropTypes.number,
    data: PropTypes.object,
}

// eslint-disable-next-line react/display-name
const InvoiceLineTotal = forwardRef(({ data, value }, ref) => {
    const [vat, setVat] = useState(data.addVat ? value * 1.2 : value)

    useImperativeHandle(ref, () => {
        return {
            refresh({ data, value }) {
                setVat(data.addVat ? value * 1.2 : value)
            },
        }
    })

    return <div>£ {vat.toFixed(2)}</div>
})

InvoiceLineTotal.propTypes = {
    value: PropTypes.number,
    data: PropTypes.object,
}

export { InvoiceLineVat, InvoiceLineTotal }
