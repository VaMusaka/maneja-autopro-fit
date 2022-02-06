import React from 'react'
import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import { BasicInfoGrid } from 'components/common'

const QuoteTableExpandableRow = ({ data }) => {
    console.log(data)
    return (
        <Box p={2}>
            <BasicInfoGrid
                data={[
                    {
                        title: 'Amount Paid',
                        info: `£ ${data.payments.card + data.payments.cash + data.payments.cheque}`,
                    },
                    { title: 'Balance', info: `£ ${data.balancePayable}` },
                    { title: 'Quote Total', info: `£ ${data.total}` },
                ]}
            />
        </Box>
    )
}

QuoteTableExpandableRow.propTypes = {
    data: PropTypes.object.isRequired,
}

export default QuoteTableExpandableRow
