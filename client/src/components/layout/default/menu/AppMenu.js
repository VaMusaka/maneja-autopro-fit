import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { Toolbar, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { menuItems } from './constants'
import { MuiIcon, AppLogo } from 'components/common'
import { MuiStyles } from 'theme'

const AppMenu = () => {
    const history = useHistory()
    const classes = MuiStyles()
    const match = useRouteMatch()

    return (
        <div>
            <Toolbar>
                <AppLogo />
            </Toolbar>
            <Divider />
            <List>
                {menuItems.map(({ title, icon, path }, index) => (
                    <ListItem
                        dense
                        button
                        key={index}
                        onClick={() => history.push(path)}
                        selected={match.path === path}
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
