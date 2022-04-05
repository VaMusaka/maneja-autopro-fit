import React from 'react'
import { MuiDrawer } from 'components/common'
import { Box, Button } from '@mui/material'
import { BackButton } from 'components/navigation'
import { useHistory } from 'react-router-dom'
import { MuiStyles } from 'theme'
import PropTypes from 'prop-types'
import UpdateQuote from '../updateQuote/UpdateQuote'
import PrintQuote from '../printQuote'
import { generateInvoice } from 'api/quotes'

const CallToActionButtons = ({ quote }) => {
    const history = useHistory()

    const generateOrViewInvoice = async () => {
        if (quote?.invoice?._id) {
            return history.push(`/invoices/${quote?.invoice?._id}/view`)
        }

        const { data } = await generateInvoice(quote._id)
        if (data) {
            history.push(`/invoices/${data._id}/view`)
        }
    }

    const classes = MuiStyles()

    return (
        <Box
            width={'100'}
            display={'flex'}
            justifyContent={'space-between'}
            className={classes.pb2}
        >
            <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-start'}>
                <Box className={classes.pr1}>
                    <Button variant={'contained'} color={'primary'} onClick={generateOrViewInvoice}>
                        {quote?.invoice?._id ? 'View' : 'Generate'} Invoice
                    </Button>
                </Box>
                {!quote?.invoice?._id && (
                    <MuiDrawer openButtonText={'Edit Quote Details'} open={false}>
                        <UpdateQuote quote={quote} />
                    </MuiDrawer>
                )}
                <Box className={classes.pl1}>
                    <PrintQuote quote={quote} />
                </Box>
            </Box>
            <BackButton />
        </Box>
    )
}

CallToActionButtons.propTypes = {
    quote: PropTypes.object.isRequired,
}

export default CallToActionButtons
