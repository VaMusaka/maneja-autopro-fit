import React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import PropTypes from 'prop-types'

const MuiRadioBox = ({ options, onChange, label, name, value }) => {
    return (
        <FormControl component="fieldset">
            {label && <FormLabel component="legend">{label}</FormLabel>}
            <RadioGroup
                row
                aria-label={label || name}
                name={name}
                onChange={onChange}
                value={value}
            >
                {options?.map(({ value, label, isDisabled }) => (
                    <FormControlLabel
                        key={value}
                        value={value}
                        control={<Radio />}
                        disabled={isDisabled}
                        label={label}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    )
}

MuiRadioBox.propTypes = {
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.any,
}

MuiRadioBox.defaultProps = {
    label: null,
}

export default MuiRadioBox
