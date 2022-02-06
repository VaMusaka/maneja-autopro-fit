import React from 'react'
import PropTypes from 'prop-types'
import * as Icon from '@mui/icons-material'

const MuiIcon = ({ name, ...rest }) => {
    // eslint-disable-next-line import/namespace
    const IconTag = Icon[name]
    return <IconTag {...rest} />
}

MuiIcon.propTypes = {
    name: PropTypes.string.isRequired,
}

export default MuiIcon
