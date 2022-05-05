import React from 'react'
import { useRouteMatch, useLocation, useHistory } from 'react-router-dom'
import { Toolbar, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { menuItems } from './constants'
import { MuiIcon, AppLogo } from 'components/common'
import { MuiStyles } from 'theme'

const AppMenu = () => {
    const history = useHistory()
    const classes = MuiStyles()
    const match = useRouteMatch()
    const location = useLocation()
    const { pathname } = location

    const isSelected = (path) => {
        if (path === pathname || path === match.path) {
            return true
        }
    }

    return (
        <div>
            <Toolbar>
                <AppLogo />
            </Toolbar>
            <Divider />
            <List sx={{ pt: 0 }}>
                {menuItems.map(({ title, icon, path }, index) => (
                    <ListItem
                        dense
                        button
                        key={index}
                        onClick={() => history.push(path)}
                        selected={isSelected(path)}
                        classes={{ selected: classes.styledSelectedMenuItem }}
                    >
                        <ListItemIcon>
                            <MuiIcon name={icon} />
                        </ListItemIcon>
                        <ListItemText primary={title} />
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default AppMenu
