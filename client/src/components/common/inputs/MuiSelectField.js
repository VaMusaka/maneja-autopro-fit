import React from 'react'
import PropTypes from 'prop-types'
import { TextField, Autocomplete, Box } from '@mui/material'

const MuiSelectField = ({
    name,
    label,
    handleChange,
    options,
    placeholder,
    defaultValue,
    isMulti,

    ...rest
}) => {
    const getSelected = () => {
        if (!defaultValue) {
            return null
        }

        const selected = options.filter(({ value }) => {
            return value === defaultValue
        })

        return selected[0]
    }

    delete rest.value

    return (
        <Box>
            <Autocomplete
                multiple={isMulti}
                id={name}
                size="small"
                options={[{ label: 'Select One', value: '' }, ...options]}
                getOptionLabel={(option) => option.label || ''}
                value={getSelected() || {}}
                onChange={handleChange}
                {...rest}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label}
                        placeholder={placeholder}
                        variant="outlined"
                    />
                )}
            />
        </Box>
    )
}

MuiSelectField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    isMulti: PropTypes.bool,
}

MuiSelectField.defaultProps = {
    isMulti: false,
    placeholder: 'Select One',
    defaultValue: null,
}

export default MuiSelectField
