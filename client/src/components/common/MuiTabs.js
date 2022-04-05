import * as React from 'react'
import PropTypes from 'prop-types'
import { Tabs, Tab, Box } from '@mui/material'

const TabPanel = ({ children, value, index, ...other }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={index}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
}

const BasicTabs = ({ content }) => {
    const [value, setValue] = React.useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {content.map(({ label }, index) => (
                        <Tab label={label} id={index} key={index} aria-controls={`tab-${index}`} />
                    ))}
                </Tabs>
            </Box>
            {content.map(({ tabContent }, index) => (
                <TabPanel value={value} index={index} key={index}>
                    {tabContent}
                </TabPanel>
            ))}
        </Box>
    )
}

BasicTabs.propTypes = {
    content: PropTypes.array,
}

export default BasicTabs
