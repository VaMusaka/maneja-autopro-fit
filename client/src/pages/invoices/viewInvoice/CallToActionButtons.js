import React, { useState, useEffect } from 'react'
import { MuiDrawer } from 'components/common'
import { useDispatch, useSelector } from 'react-redux'
import CreatePurchase from 'pages/purchases/createPurchase'
import { toggleCreateDrawer } from 'utils'
import { purchasesSelector } from 'redux/selectors'
import { Box } from '@mui/material'
import { BackButton } from 'components/navigation'
import { MuiStyles } from 'theme'
import PropTypes from 'prop-types'
import UpdateInvoice from '../updateInvoice/UpdateInvoice'
import PrintInvoice from '../printInvoice'

const CallToActionButtons = ({ invoice }) => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const dispatch = useDispatch()
    const classes = MuiStyles()
    const { layout } = useSelector(purchasesSelector)

    useEffect(() => {
        setDrawerOpen(layout.openCreateDrawer)
    }, [layout.openCreateDrawer])

    return (
        <>
            <Box
                width={'100'}
                display={'flex'}
                justifyContent={'space-between'}
                className={classes.pb2}
            >
                <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-start'}>
                    <Box component={'span'} className={classes.pr1}>
                        <MuiDrawer
                            key={'create'}
                            openButtonText={'Create Purchase'}
                            open={drawerOpen}
                            handleOpen={() =>
                                toggleCreateDrawer(
                                    dispatch,
                                    layout,
                                    'UPDATE_PURCHASES_LAYOUT',
                                    true
                                )
                            }
                            handleClose={() =>
                                toggleCreateDrawer(
                                    dispatch,
                                    layout,
                                    'UPDATE_PURCHASES_LAYOUT',
                                    false
                                )
                            }
                        >
                            <CreatePurchase invoice={invoice} />
                        </MuiDrawer>
                    </Box>
                    <MuiDrawer openButtonText={'Edit Invoice Details'} open={false}>
                        <UpdateInvoice invoice={invoice} />
                    </MuiDrawer>
                    <Box className={classes.pl1}>
                        <PrintInvoice invoice={invoice} />
                    </Box>
                </Box>
                <BackButton />
            </Box>
        </>
    )
}

CallToActionButtons.propTypes = {
    invoice: PropTypes.object.isRequired,
}

export default CallToActionButtons
