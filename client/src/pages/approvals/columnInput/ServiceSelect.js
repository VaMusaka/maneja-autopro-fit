import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { servicesSelector } from 'redux/selectors'
import PropTypes from 'prop-types'
import { makeServiceSelectionOptions } from 'utils'
import { MuiSelectField } from 'components/common'
import { Paper } from '@mui/material'

// eslint-disable-next-line react/display-name
const ServiceSelect = forwardRef((props, ref) => {
    const [value, setValue] = useState(props?.value)
    const [editing, setEditing] = useState(true)
    const refContainer = useRef(null)
    const { services, loading } = useSelector(servicesSelector)

    const serviceOptions = !loading ? makeServiceSelectionOptions(services) : []

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
                options={serviceOptions}
                name={'service'}
                label={'Service'}
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

ServiceSelect.propTypes = {
    value: PropTypes.bool.isRequired,
    api: PropTypes.object.isRequired,
    selectOptions: PropTypes.any,
}

export default ServiceSelect
