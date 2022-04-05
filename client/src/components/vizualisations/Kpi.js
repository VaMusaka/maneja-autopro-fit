import React from 'react'
import PropTypes from 'prop-types'
import { Box, Paper, Typography, IconButton, Tooltip } from '@mui/material'
import { MuiIcon } from 'components/common'
import { MuiStyles } from 'theme'
import clsx from 'clsx'

const Kpi = ({ value, label, action, color }) => {
    const classes = MuiStyles()

    return (
        <Paper style={{ width: '100%' }}>
            <Box
                className={clsx(classes.pv1)}
                width={'100%'}
                style={{ position: 'relative' }}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Box
                    width={'100%'}
                    display={'flex'}
                    flexDirection={'row'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Typography
                        color={color}
                        variant={'h3'}
                        noWrap={true}
                        style={{ textOverflow: 'ellipsis' }}
                    >
                        {value}
                    </Typography>
                </Box>
                <Typography
                    color={color}
                    variant={'subtitle1'}
                    style={{ textTransform: 'uppercase' }}
                >
                    {label}
                </Typography>
                {action && (
                    <Box
                        style={{
                            position: 'absolute',
                            zIndex: 1,
                            bottom: 5,
                            right: 6,
                        }}
                    >
                        <Tooltip title={action.tooltip || ''}>
                            <IconButton
                                size={'small'}
                                color={color}
                                variant={'outlined'}
                                onClick={action.callback}
                            >
                                <MuiIcon name={action.icon} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
            </Box>
        </Paper>
    )
}

Kpi.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
    label: PropTypes.string.isRequired,
    action: PropTypes.object,
    color: PropTypes.string,
}

Kpi.defaultProps = {
    color: 'primary',
}

export default Kpi
