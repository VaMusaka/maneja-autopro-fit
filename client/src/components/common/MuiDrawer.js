import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Drawer, Button, Box, IconButton, Tooltip } from '@mui/material'
import MuiIcon from './MuiIcon'
import { MuiStyles } from 'theme'

const MuiDrawer = ({
    openButtonText,
    openButtonIcon,
    children,
    open,
    handleOpen,
    handleClose,
    tooltip,
    width,
}) => {
    const anchor = 'right'
    const [isOpen, setIsOpen] = useState(open)
    const classes = MuiStyles()

    useEffect(() => {
        setIsOpen(open)
    }, [open])

    return (
        <div>
            {openButtonText && (
                <Button
                    onClick={() => {
                        setIsOpen(true)
                        handleOpen && handleOpen()
                    }}
                    color="primary"
                    variant="contained"
                >
                    {openButtonText}
                </Button>
            )}

            {openButtonIcon && (
                <Tooltip title={tooltip}>
                    <IconButton
                        size="small"
                        onClick={() => {
                            setIsOpen(true)
                            handleOpen && handleOpen()
                        }}
                    >
                        <MuiIcon size="small" color="primary" name={openButtonIcon} />
                    </IconButton>
                </Tooltip>
            )}

            <Drawer
                anchor={anchor}
                open={isOpen}
                classes={{
                    paper: classes.styledDrawer,
                }}
            >
                <Box width={width} p={2} height={'inherit'}>
                    <Box
                        style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                        }}
                    >
                        <IconButton
                            onClick={() => {
                                setIsOpen(false)
                                handleClose && handleClose()
                            }}
                        >
                            <MuiIcon name={'Close'} />
                        </IconButton>
                    </Box>
                    <Box styles={{ paddingBottom: 400 }}>{children}</Box>
                </Box>
            </Drawer>
        </div>
    )
}

MuiDrawer.propTypes = {
    children: PropTypes.node.isRequired,
    openButtonText: PropTypes.string,
    openButtonIcon: PropTypes.string,
    open: PropTypes.bool,
    handleOpen: PropTypes.func,
    handleClose: PropTypes.func,
    width: PropTypes.number,
    tooltip: PropTypes.string,
}
MuiDrawer.defaultProps = {
    open: false,
    handleOpen: null,
    handleClose: null,
    width: 450,
    tooltip: '',
}

export default MuiDrawer
