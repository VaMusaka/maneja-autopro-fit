import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Chip } from '@mui/material'
import PropTypes from 'prop-types'
import { MuiIcon } from 'components/common'

// eslint-disable-next-line react/display-name
const PaymentMethod = forwardRef((props, ref) => {
    const [payment, setPayment] = useState(props?.value)

    useImperativeHandle(ref, () => {
        return {
            refresh(params) {
                setPayment(params.value)
            },
        }
    })

    return (
        <>
            {payment.card > 0 && (
                <Chip
                    icon={<MuiIcon name={'CreditCard'} />}
                    variant="outlined"
                    color={'primary'}
                    size={'small'}
                    label={'CARD'}
                />
            )}
            {payment.cash > 0 && (
                <Chip
                    icon={<MuiIcon name={'Money'} />}
                    variant="outlined"
                    color={'primary'}
                    size={'small'}
                    label={'CASH'}
                />
            )}
            {payment.cheque > 0 && (
                <Chip
                    icon={<MuiIcon name={'PriceCheck'} />}
                    variant="outlined"
                    color={'primary'}
                    size={'small'}
                    label={'CHEQUE'}
                />
            )}
        </>
    )
})

PaymentMethod.propTypes = {
    value: PropTypes.string,
}

export default PaymentMethod
