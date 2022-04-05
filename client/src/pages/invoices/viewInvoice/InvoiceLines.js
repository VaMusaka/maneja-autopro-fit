import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import clsx from 'clsx'
import { MuiStyles } from 'theme'
import DataTable from 'react-data-table-component'
import { MuiDrawer } from 'components/common'
import InvoiceLineForm from './InvoiceLineForm'
import { invoiceLineTableColumns } from '../constants'
import { nanoid } from 'nanoid'

const InvoiceLines = ({ invoice, services }) => {
    const { lines } = invoice
    const invoiceLines = lines?.map((line) => {
        return {
            ...line,
            _id: nanoid(),
        }
    })

    const tableData = invoiceLines?.map((line) => {
        return {
            ...line,
            invoiceLines,
            invoice,
            services,
        }
    })

    const classes = MuiStyles()

    return (
        <Box className={classes.pt3} style={{ minHeight: 300 }}>
            <Box className={clsx(classes.pt2, classes.pl2)}>
                <Typography variant={'subtitle1'}>Invoice Lines</Typography>
            </Box>
            <DataTable noHeader data={tableData} columns={invoiceLineTableColumns} />
            <Box width={'100%'} display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
                <MuiDrawer openButtonText={'ADD INVOICE LINE'}>
                    <InvoiceLineForm invoice={invoice} services={services} />
                </MuiDrawer>
            </Box>
        </Box>
    )
}

InvoiceLines.propTypes = {
    invoice: PropTypes.object.isRequired,
    services: PropTypes.array,
}

export default InvoiceLines
