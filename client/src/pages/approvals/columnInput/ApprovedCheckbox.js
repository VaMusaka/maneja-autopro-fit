import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { MuiCheckbox } from 'components/common'
import PropTypes from 'prop-types'

// eslint-disable-next-line react/display-name
const ApproveCheckbox = forwardRef((props, ref) => {
    const [approved, setApproved] = useState(props?.value)
    const [editing, setEditing] = useState(true)
    const refContainer = useRef(null)

    useEffect(() => {
        focus()
    }, [])

    useImperativeHandle(ref, () => {
        return {
            getValue() {
                return approved
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
        <div style={{ paddingLeft: 20, width: 200 }} ref={refContainer}>
            <MuiCheckbox
                name={'approved'}
                label={'Approved '}
                handleChange={({ target }) => {
                    setApproved(target.checked)
                    setEditing(false)
                }}
                checked={approved}
            />
        </div>
    )
})

ApproveCheckbox.propTypes = {
    value: PropTypes.bool.isRequired,
    api: PropTypes.object.isRequired,
}

export default ApproveCheckbox
