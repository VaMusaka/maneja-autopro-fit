import React from 'react'
import PropTypes from 'prop-types'
import { AppBar, Toolbar, IconButton, Typography, Tooltip } from '@mui/material'
import { useDispatch } from 'react-redux'
import { signOutUserAction } from 'redux/authentication/actions'
import { MuiIcon } from 'components/common'
import { MuiStyles } from 'theme'

const AppTopBar = ({ handleDrawerToggle, title, drawerWidth, mobileOpen }) => {
    const classes = MuiStyles()
    const dispatch = useDispatch()

    return (
        <AppBar
            position="absolute"
            sx={{
                width: {
                    sm: `calc(100% - ${mobileOpen ? drawerWidth : 0}px)`,
                    md: `calc(100% - ${drawerWidth + 60}px)`,
                },
                ml: {
                    sm: `${mobileOpen ? drawerWidth : 0}px`,
                    md: `${drawerWidth}px`,
                },
            }}
            className={classes.appBar}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2 }}
                >
                    <MuiIcon name={mobileOpen ? 'MenuOpen' : 'Menu'} />
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>
                <Tooltip title={'Logout'}>
                    <IconButton color="inherit" onClick={() => dispatch(signOutUserAction())}>
                        <MuiIcon name={'Logout'} />
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    )
}

AppTopBar.propTypes = {
    handleDrawerToggle: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    drawerWidth: PropTypes.number.isRequired,
    mobileOpen: PropTypes.bool,
}

export default AppTopBar
