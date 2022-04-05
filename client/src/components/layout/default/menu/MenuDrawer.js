import React from 'react'
import PropTypes from 'prop-types'
import { Drawer } from '@mui/material'
import AppMenu from './AppMenu'
import { MuiStyles } from 'theme'

const MenuDrawer = ({ window, drawerWidth, mobileOpen, handleDrawerToggle, isDesktop }) => {
    const classes = MuiStyles()
    const container = window !== undefined ? () => window().document.body : undefined
    return (
        <>
            <Drawer
                container={container}
                classes={{
                    paper: classes.styledMenuBar,
                }}
                variant={isDesktop ? 'permanent' : 'temporary'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                <AppMenu />
            </Drawer>
        </>
    )
}

MenuDrawer.propTypes = {
    handleDrawerToggle: PropTypes.func.isRequired,
    drawerWidth: PropTypes.number.isRequired,
    mobileOpen: PropTypes.bool.isRequired,
    window: PropTypes.func,
    isDesktop: PropTypes.bool,
}

export default MenuDrawer
