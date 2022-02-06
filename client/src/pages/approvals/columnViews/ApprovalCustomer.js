import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { useSelector } from 'react-redux'
import { customersSelector } from 'redux/selectors'

import PropTypes from 'prop-types'

// eslint-disable-next-line react/display-name
const ApprovalCustomer = forwardRef((props, ref) => {
    const { customers, loading } = useSelector(customersSelector)

    const getSelectedCustomer = (customer) => {
        if (loading || !customer) {
            return 'Select Customer'
        }

        const selected = customers?.find(({ _id }) => _id === customer)
        if (!selected) {
            return 'Select Customer'
        }
        return `${selected.name} - ${selected.email}`
    }

    const [selectedCustomer, setSelectedCustomer] = useState(getSelectedCustomer(props?.value))

    useImperativeHandle(ref, () => {
        return {
            refresh(params) {
                setSelectedCustomer(getSelectedCustomer(params?.value))
            },
        }
    })

    return <>{selectedCustomer}</>
})

ApprovalCustomer.propTypes = {
    value: PropTypes.string,
}

export default ApprovalCustomer
