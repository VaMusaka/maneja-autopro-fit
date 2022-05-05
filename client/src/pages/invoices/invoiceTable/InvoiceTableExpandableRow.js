import React from 'react'
import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import { BasicInfoGrid } from 'components/common'

const InvoiceTableExpandableRow = ({ data }) => {
    return (
        <Box p={2}>
            <BasicInfoGrid
                data={[
                    {
                        title: 'Amount Paid',
                        info: `£ ${data.payments.card + data.payments.cash + data.payments.cheque}`,
                    },
                    { title: 'Balance', info: `£ ${data.balancePayable}` },
                    { title: 'Invoice Total', info: `£ ${data.total}` },
                ]}
            />
        </Box>
    )
}

InvoiceTableExpandableRow.propTypes = {
    data: PropTypes.object.isRequired,
}

export default InvoiceTableExpandableRow
