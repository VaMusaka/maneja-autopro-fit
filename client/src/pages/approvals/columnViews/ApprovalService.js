import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { useSelector } from 'react-redux'
import { servicesSelector } from 'redux/selectors'

import PropTypes from 'prop-types'

// eslint-disable-next-line react/display-name
const ApprovalService = forwardRef((props, ref) => {
    const { services, loading } = useSelector(servicesSelector)

    const getSelectedService = (service) => {
        if (loading || !service) {
            return 'Select Service'
        }

        const selected = services?.find(({ _id }) => _id === service)
        if (!selected) {
            return 'Select Service'
        }
        return selected?.title
    }

    const [selectedService, setSelectedService] = useState(getSelectedService(props?.value))

    useImperativeHandle(ref, () => {
        return {
            refresh(params) {
                setSelectedService(getSelectedService(params?.value))
            },
        }
    })

    return <>{selectedService}</>
})

ApprovalService.propTypes = {
    value: PropTypes.string,
}

export default ApprovalService
