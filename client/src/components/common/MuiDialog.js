import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import PropTypes from 'prop-types'
import { MuiIcon } from './index'
import { Box, IconButton } from '@mui/material'

const MuiDialog = ({
    content,
    title,
    handleConfirm,
    ActionButton,
    confirmButton,
    declineButton,
}) => {
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Box p={2}>
            {ActionButton.icon && (
                <IconButton onClick={() => setOpen(true)}>
                    <MuiIcon size="small" color="primary" name={'Delete'} />
                </IconButton>
            )}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
                {content && (
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {content}
                        </DialogContentText>
                    </DialogContent>
                )}
                <DialogActions>
                    <Button variant={'outlines'} color={'primary'} onClick={handleClose}>
                        {declineButton}
                    </Button>
                    <Button
                        variant={'contained'}
                        color={'primary'}
                        onClick={() => {
                            handleClose()
                            handleConfirm()
                        }}
                    >
                        {confirmButton}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

MuiDialog.propTypes = {
    handleConfirm: PropTypes.func.isRequired,
    ActionButton: PropTypes.object,
    confirmButton: PropTypes.string,
    declineButton: PropTypes.string,
    content: PropTypes.any,
    title: PropTypes.string,
}

MuiDialog.defaultProps = {
    actionButton: 'Open',
    confirmButton: 'Agree',
    declineButton: 'Close',
}

export default MuiDialog
