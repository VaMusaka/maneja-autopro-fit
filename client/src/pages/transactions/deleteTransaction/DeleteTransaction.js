import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { deleteTransactionAction } from 'redux/transactions/actions'
import { Alert, Box, Button, Divider, Grid, Typography } from '@mui/material'
import { MuiStyles } from 'theme'
import { BasicInfoGrid } from 'components/common'
import clsx from 'clsx'
import dayjs from 'dayjs'

const DeleteTransaction = ({ transaction }) => {
    const dispatch = useDispatch()
    const classes = MuiStyles()
    return (
        <Box>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h5" color={'error'}>
                        Delete Transaction
                    </Typography>
                    <Typography variant={'subtitle1'}>
                        {transaction.autoId || 'Transaction'}
                    </Typography>
                </Grid>
            </Grid>

            <Box className={clsx(classes.pt3, classes.pb3)}>
                <Divider />
            </Box>

            <Box>
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

            <Box className={classes.pt3}>
                <Alert severity={'warning'} color={'error'}>
                    Deleting Transaction will remove this and associated records completely, this
                    process is not reversible.
                </Alert>
            </Box>
            <Box className={classes.pt3}>
                <Button
                    variant={'contained'}
                    color={'error'}
                    onClick={() => {
                        dispatch(deleteTransactionAction(transaction._id))
                    }}
                >
                    Confirm Delete
                </Button>
            </Box>
        </Box>
    )
}

DeleteTransaction.propTypes = {
    transaction: PropTypes.object,
}

export default DeleteTransaction
