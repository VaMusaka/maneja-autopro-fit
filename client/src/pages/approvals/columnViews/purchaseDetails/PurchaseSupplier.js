import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { suppliersSelector } from 'redux/selectors'
import PropTypes from 'prop-types'

// eslint-disable-next-line react/display-name
const PurchaseSupplier = ({ value }) => {
    const [supplier, setSupplier] = useState(null)
    const { suppliers } = useSelector(suppliersSelector)

    const getPurchaseSupplier = () => {
        const purchaseSupplier = suppliers.find(({ _id }) => _id === value)
        setSupplier(purchaseSupplier?.name)
    }

    useEffect(() => {
        getPurchaseSupplier()
        //eslint-disable-next-line
    }, [suppliers])

    return <>{supplier}</>
}

PurchaseSupplier.propTypes = {
    value: PropTypes.string.isRequired,
}
export default PurchaseSupplier
