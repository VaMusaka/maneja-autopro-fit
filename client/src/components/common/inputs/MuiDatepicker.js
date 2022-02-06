import * as React from 'react'
import DayjsUtils from '@date-io/dayjs'
import enLocale from 'date-fns/locale/en-GB'
import { LocalizationProvider, DatePicker } from '@mui/lab'
import { Box, TextField } from '@mui/material'
import PropTypes from 'prop-types'

const MuiDatepicker = ({ label, name, errors, value, onChange }) => {
    return (
        <Box>
            <LocalizationProvider locale={enLocale} dateAdapter={DayjsUtils}>
                <DatePicker
                    mask="__/__/____"
                    label={label}
                    displayStaticWrapperAs="desktop"
                    openTo="day"
                    name={name}
                    value={value}
                    onChange={onChange}
                    allowKeyboardControl={false}
                    inputFormat="DD/MM/YYYY"
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
        </Box>
    )
}

MuiDatepicker.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    errors: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}

export default MuiDatepicker
