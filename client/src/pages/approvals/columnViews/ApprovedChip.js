import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Chip } from '@mui/material'
import PropTypes from 'prop-types'

// eslint-disable-next-line react/display-name
const ApprovedChip = forwardRef((props, ref) => {
    const approvedStatus = (status) => {
        if (Boolean(status) === true) {
            return {
                variant: 'contained',
                label: 'Approved',
                color: 'primary',
            }
        } else {
            return {
                variant: 'outlined',
                label: 'Not Approved',
                color: 'primary',
            }
        }
    }

    const [statusProps, setStatusProps] = useState(approvedStatus(props.value))

    useImperativeHandle(ref, () => {
        return {
            refresh(params) {
                setStatusProps(approvedStatus(params.value))
            },
        }
    })

    return <Chip size={'small'} {...statusProps} />
})

ApprovedChip.propTypes = {
    value: PropTypes.bool,
}

export default ApprovedChip
