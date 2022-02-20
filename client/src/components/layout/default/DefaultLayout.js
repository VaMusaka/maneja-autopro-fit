import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, CssBaseline, Toolbar } from '@mui/material'
import AppTopBar from './appTopBar'
import MenuDrawer from './menu/MenuDrawer'

const DefaultLayout = ({ title, children }) => {
    const [drawerWidth, setDrawerWidth] = useState(250)
    const [mobileOpen, setMobileOpen] = useState(false)
    const windowWidth = window.innerWidth

    useEffect(() => {
        const isOpen = windowWidth > 600
        setMobileOpen(isOpen)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setDrawerWidth(mobileOpen ? 250 : 0)
    }, [mobileOpen])

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    return (
        <Box
            sx={{ display: 'flex' }}
            style={{
                minHeight: '100vh',
                backgroundColor: 'rgba(45,46,65,0.05)',
            }}
        >
            <CssBaseline />

            <AppTopBar
                title={title}
                mobileOpen={mobileOpen}
                drawerWidth={drawerWidth}
                handleDrawerToggle={handleDrawerToggle}
            />

            <Box
                component="nav"
                sx={{
                    width: { md: drawerWidth },
                    display: mobileOpen ? 'block' : 'none',
                    flexShrink: { sm: 0 },
                }}
            >
                <MenuDrawer
                    isDesktop={windowWidth > 900}
                    mobileOpen={mobileOpen}
                    handleDrawerToggle={handleDrawerToggle}
                    drawerWidth={drawerWidth}
                />
            </Box>

            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3 }}
                style={{ width: '100%', overflowY: 'hidden' }}
            >
                <Toolbar />
                <Box
                    sx={{
                        ml: { sm: 0, md: 2 },
                    }}
                    style={{ width: 'calc(100% - 60)px' }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    )
}

DefaultLayout.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
}

export default DefaultLayout
