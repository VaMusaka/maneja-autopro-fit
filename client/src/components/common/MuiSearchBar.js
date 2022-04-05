import * as React from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { MuiIcon } from './index'

const MuiSearchBar = ({ placeholder, handleSearch, handleClear }) => {
    const [value, setValue] = useState('')

    const clear = () => {
        setValue('')
        handleClear()
    }

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={placeholder}
                inputProps={{ 'aria-label': 'search google maps' }}
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />
            <IconButton
                type="submit"
                sx={{ p: '10px' }}
                aria-label="search"
                onClick={() => handleSearch(value)}
            >
                <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={clear}>
                <MuiIcon name={'Clear'} />
            </IconButton>
        </Paper>
    )
}

MuiSearchBar.propTypes = {
    placeholder: PropTypes.string,
    handleSearch: PropTypes.func.isRequired,
    handleClear: PropTypes.func.isRequired,
}

export default MuiSearchBar
