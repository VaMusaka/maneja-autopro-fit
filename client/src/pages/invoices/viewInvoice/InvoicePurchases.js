import React from 'react'
import { MuiStyles } from 'theme'
import { Box, Divider, Typography } from '@mui/material'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { MuiDrawer } from 'components/common'
import CreatePurchase from 'pages/purchases/createPurchase'
import DataTable from 'react-data-table-component'
import { purchaseTableColumns } from 'pages/purchases/constants'
import PurchaseTableExpandableRow from 'pages/purchases/purchaseTable/PurchaseTableExpandableRow'

const InvoicePurchases = ({ invoice }) => {
    const classes = MuiStyles()
    const purchases = invoice?.purchases || []

    return (
        <Box className={classes.pt2}>
            <Divider />
            <Box className={clsx(classes.pt2, classes.pl2)}>
                <Typography variant={'subtitle1'}>Invoice Purchases (Expenses)</Typography>
            </Box>
            <DataTable
                title={'ALL PURCHASES'}
                noHeader
                fixedHeader
                highlightOnHover
                pagination
                persistTableHead
                responsive
                striped
                subHeaderAlign="right"
                subHeaderWrap
                columns={purchaseTableColumns}
                expandableRows
                expandableRowsComponent={PurchaseTableExpandableRow}
                data={purchases || []}
            />
            <Box width={'100%'} display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
                <MuiDrawer openButtonText={'Create Invoice Purchase'}>
                    <CreatePurchase invoice={invoice} />
                </MuiDrawer>
            </Box>
        </Box>
    )
}

InvoicePurchases.propTypes = {
    invoice: PropTypes.object.isRequired,
}

export default InvoicePurchases
