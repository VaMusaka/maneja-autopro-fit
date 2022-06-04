import * as React from 'react'
import { TextField } from '@mui/material'
import PropTypes from 'prop-types'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

const MuiDatepicker = ({ label, name, errors, value, onChange }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                mask="__/__/____"
                label={label}
                displayStaticWrapperAs="desktop"
                openTo="day"
                name={name}
                value={value}
                onChange={onChange}
                allowKeyboardControl={false}
                inputFormat="dd/MM/yyyy"
                renderInput={(params) => (
                    <TextField
                        fullWidth
                        error={Boolean(errors)}
                        helperText={errors}
                        size={'small'}
                        {...params}
                    />
                )}
            />
        </LocalizationProvider>
    )
}

MuiDatepicker.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    errors: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}

export default MuiDatepicker
