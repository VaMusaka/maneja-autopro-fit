import React from 'react'
import PropTypes from 'prop-types'
import { Box, Divider, Grid, Typography } from '@mui/material'
import { MuiStyles } from 'theme'
import { BasicInfoGrid } from 'components/common'
import dayjs from 'dayjs'

const ViewTransaction = ({ transaction }) => {
    const classes = MuiStyles()
    return (
        <Box>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h5">Transaction #{transaction?.autoId}</Typography>
                </Grid>
            </Grid>

            <Box className={classes.pt3}>
                <Divider />
            </Box>

            <BasicInfoGrid
                data={[
                    { title: '#', info: transaction.autoId },
                    { title: 'Reference', info: transaction.customerRef },
                    {
                        title: 'Amount (£)',
                        info: `£ ${parseInt(transaction.amount).toFixed(2) || '00.00'}`,
                    },
                    { title: 'Notes', info: transaction.notes },
                    {
                        title: 'Transaction Date',
                        info: dayjs(transaction.date).format('DD MMM YYYY'),
                    },
                ]}
            />
        </Box>
    )
}

ViewTransaction.propTypes = {
    transaction: PropTypes.object.isRequired,
}

export default ViewTransaction
