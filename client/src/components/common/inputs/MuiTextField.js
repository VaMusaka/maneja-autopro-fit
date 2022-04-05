import React from 'react'
import { TextField, Box } from '@mui/material'
import PropTypes from 'prop-types'

/* eslint-disable react/jsx-props-no-spreading */
const MuiTextField = ({ variant, fullWidth, errors, ...rest }) => {
    return (
        <Box>
            <TextField
                {...rest}
                size="small"
                variant={variant}
                fullWidth={fullWidth}
                error={Boolean(errors)}
                helperText={errors}
            />
        </Box>
    )
}

MuiTextField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
    variant: PropTypes.string,
    fullWidth: PropTypes.bool,
    errors: PropTypes.string,
}

MuiTextField.defaultProps = {
    value: '',
    variant: 'outlined',
    fullWidth: true,
    errors: null,
}

export default MuiTextField
