import React from 'react'
import PropTypes from 'prop-types'
import { useRouteMatch } from 'react-router-dom'
import { Box, IconButton } from '@mui/material'
import { MuiDrawer, MuiIcon } from 'components/common'
import DeleteQuote from '../deleteQuote'
import UpdateQuote from '../updateQuote/UpdateQuote'
import { openTab } from 'utils'

const QuoteTableActions = ({ quote }) => {
    const { url } = useRouteMatch()
    return (
        <Box display={'flex'} flexDirection={'space-between'}>
            {!quote?.invoice?._id && (
                <MuiDrawer openButtonIcon={'Edit'} open={false}>
                    <UpdateQuote quote={quote} />
                </MuiDrawer>
            )}
            <IconButton size="small" onClick={() => openTab(`/#${url}/${quote._id}/view`)}>
                <MuiIcon size="small" color="primary" name={'FolderOpen'} />
            </IconButton>
            {!quote?.invoice?._id && (
                <MuiDrawer openButtonIcon={'Delete'} open={false}>
                    <DeleteQuote quote={quote} />
                </MuiDrawer>
            )}
        </Box>
    )
}
QuoteTableActions.propTypes = {
    quote: PropTypes.object.isRequired,
}

export default QuoteTableActions
