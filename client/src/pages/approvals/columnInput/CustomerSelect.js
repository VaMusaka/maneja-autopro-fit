import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { customersSelector } from 'redux/selectors'
import PropTypes from 'prop-types'
import { makeCustomerSelectOptions } from 'utils'
import { MuiSelectField } from 'components/common'
import { Paper } from '@mui/material'

// eslint-disable-next-line react/display-name
const CustomerSelect = forwardRef((props, ref) => {
    const [value, setValue] = useState(props?.value)
    const [editing, setEditing] = useState(true)
    const refContainer = useRef(null)
    const { customers, loading } = useSelector(customersSelector)

    const customerOptions = !loading ? makeCustomerSelectOptions(customers) : []

    useEffect(() => {
        focus()
    }, [])

    useImperativeHandle(ref, () => {
        return {
            getValue() {
                return value
            },

            isPopup() {
                return true
            },
        }
    })

    useEffect(() => {
        if (!editing) {
            props.api.stopEditing()
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editing])

    return (
        <div
            style={{
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 20,
                paddingBottom: 20,
                width: 300,
            }}
            ref={refContainer}
        >
            <MuiSelectField
                options={customerOptions}
                name={'customer'}
                label={'Customer'}
                handleChange={(event, selected) => {
                    console.log(event, selected)
                    setValue(selected.value)
                    setEditing(false)
                }}
                value={value}
                PaperComponent={({ children }) => (
                    <Paper
                        style={{
                            width: 300,
                            marginLeft: -10,
                        }}
                    >
                        {children}
                    </Paper>
                )}
            />
        </div>
    )
})

CustomerSelect.propTypes = {
    value: PropTypes.bool.isRequired,
    api: PropTypes.object.isRequired,
    selectOptions: PropTypes.any,
}

export default CustomerSelect
