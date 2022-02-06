import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import clsx from 'clsx'
import { MuiStyles } from 'theme'
import DataTable from 'react-data-table-component'
import { MuiDrawer } from 'components/common'
import QuoteLineForm from './QuoteLineForm'
import { quoteLineTableColumns } from '../constants'
import { nanoid } from 'nanoid'

const QuoteLines = ({ quote, services }) => {
    const { lines } = quote
    const quoteLines = lines?.map((line) => {
        return {
            ...line,
            _id: nanoid(),
        }
    })

    const tableData = quoteLines?.map((line) => {
        return {
            ...line,
            quoteLines,
            quote,
            services,
        }
    })

    const classes = MuiStyles()

    return (
        <Box className={classes.pt3} style={{ minHeight: 300 }}>
            <Box className={clsx(classes.pt2, classes.pl2)}>
                <Typography variant={'subtitle1'}>Quote Lines</Typography>
            </Box>
            <DataTable noHeader data={tableData} columns={quoteLineTableColumns} />
            <Box width={'100%'} display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
                {!quote?.invoice?._id && (
                    <MuiDrawer openButtonText={'ADD QUOTE LINE'}>
                        <QuoteLineForm quote={quote} services={services} />
                    </MuiDrawer>
                )}
            </Box>
        </Box>
    )
}

QuoteLines.propTypes = {
    quote: PropTypes.object.isRequired,
    services: PropTypes.array,
}

export default QuoteLines
