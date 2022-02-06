import React from 'react'
import PropTypes from 'prop-types'
import { FormControlLabel, Checkbox, Box } from '@mui/material'

const MuiCheckbox = ({ checked, handleChange, name, label, ...rest }) => (
    <Box>
        <FormControlLabel
            control={
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    name={name}
                    color="primary"
                    {...rest}
                />
            }
            label={label}
        />
    </Box>
)

MuiCheckbox.propTypes = {
    checked: PropTypes.bool,
    handleChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
}

MuiCheckbox.defaultProps = {
    checked: false,
}

export default MuiCheckbox
