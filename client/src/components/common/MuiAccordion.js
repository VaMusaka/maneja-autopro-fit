import * as React from 'react'
import PropTypes from 'prop-types'
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import MuiIcon from './MuiIcon'

const MuiAccordion = ({ items }) => {
    return (
        <div>
            {items?.map((item) => (
                <Accordion key={item.key}>
                    <AccordionSummary
                        expandIcon={<MuiIcon name={'ExpandMore'} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{item.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>{item.details}</AccordionDetails>
                </Accordion>
            ))}
        </div>
    )
}

MuiAccordion.propTypes = {
    items: PropTypes.array.isRequired,
}

export default MuiAccordion
