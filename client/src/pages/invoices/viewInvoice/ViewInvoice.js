import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Divider, Paper, Typography } from '@mui/material'
import { invoicesSelector, servicesSelector } from 'redux/selectors'
import { getInvoiceAction } from 'redux/invoices/actions'
import AddressHeader from './AddressHeader'
import PricingFooter from './PricingFooter'
import InvoiceLines from './InvoiceLines'
import { getServicesAction } from 'redux/services/actions'
import CallToActionButtons from './CallToActionButtons'
import InvoicePurchases from './InvoicePurchases'
import { companyDetails } from 'config'
import { AppLogo } from 'components/common'
import { MuiStyles } from 'theme'
import dayjs from 'dayjs'

const ViewInvoice = () => {
    const [logo, setLogo] = useState(null)
    const classes = MuiStyles()
    const dispatch = useDispatch()
    const { id } = useParams()
    const INVOICES = useSelector(invoicesSelector)
    const SERVICES = useSelector(servicesSelector)

    const { invoice } = INVOICES
    const { services } = SERVICES

    const isLoading = INVOICES.loading || SERVICES.loading

    const getDepartmentLogo = () => {
        if (!invoice?.department) {
            setLogo(companyDetails.appLogo)
            return
        }

        const department = companyDetails?.departments?.find(
            ({ name }) => invoice.department === name
        )

        if (department) {
            setLogo(department.logo)
            return
        }
    }

    useEffect(() => {
        dispatch(getInvoiceAction(id))
        dispatch(getServicesAction())

        return () => {
            dispatch({ type: 'GET_INVOICE', payload: null })
        }
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        getDepartmentLogo()
        // eslint-disable-next-line
    }, [invoice])

    if (isLoading || !invoice || !services) {
        return 'Loading'
    }

    return (
        <Box>
            <CallToActionButtons invoice={invoice} />
            <Paper>
                <Box>
                    <Box p={4}>
                        <Box width={340}>
                            {logo ? (
                                <img
                                    src={logo}
                                    alt="app logo"
                                    width={'100%'}
                                    className={classes.rounded}
                                />
                            ) : (
                                <AppLogo />
                            )}
                        </Box>
                        <Typography variant={'h4'}>Tax Invoice</Typography>
                        <Typography variant={'h5'}>INV # {invoice?.autoId}</Typography>
                        <Box display={'flex'} flexDirection={'row'}>
                            <Box sx={{ mr: 5 }}>
                                <Typography variant={'overline'}>
                                    DATE : {dayjs(invoice.invoiceDate).format('DD/MM/YYYY')}
                                </Typography>
                            </Box>
                            <Box sx={{ mr: 5 }}>
                                <Typography variant={'overline'}>
                                    REG : {invoice.vehicleReg}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Divider />
                    <Box p={4} minHeight={720}>
                        {invoice && <AddressHeader invoice={invoice} />}
                        {invoice && <InvoiceLines invoice={invoice} services={services} />}
                        {invoice && <PricingFooter invoice={invoice} />}
                        {invoice && <InvoicePurchases invoice={invoice} />}
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}

export default ViewInvoice
