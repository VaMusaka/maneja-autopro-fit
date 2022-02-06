import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Divider, Paper, Typography } from '@mui/material'
import { quotesSelector, servicesSelector } from 'redux/selectors'
import { getQuoteAction } from 'redux/quotes/actions'
import AddressHeader from './AddressHeader'
import PricingFooter from './PricingFooter'
import QuoteLines from './QuoteLines'
import { getServicesAction } from 'redux/services/actions'
import CallToActionButtons from './CallToActionButtons'
import { companyDetails } from 'config'
import { AppLogo } from 'components/common'
import { MuiStyles } from 'theme'

const ViewQuote = () => {
    const [logo, setLogo] = useState(null)
    const classes = MuiStyles()
    const dispatch = useDispatch()
    const { id } = useParams()
    const QUOTES = useSelector(quotesSelector)
    const SERVICES = useSelector(servicesSelector)

    const { quote } = QUOTES
    const { services } = SERVICES

    const isLoading = QUOTES.loading || SERVICES.loading

    const getDepartmentLogo = () => {
        if (!quote?.department) {
            setLogo(companyDetails.appLogo)
            return
        }

        const department = companyDetails?.departments?.find(
            ({ name }) => quote.department === name
        )

        if (department) {
            setLogo(department.logo)
            return
        }
    }

    useEffect(() => {
        dispatch(getQuoteAction(id))
        dispatch(getServicesAction())

        return () => {
            dispatch({ type: 'GET_QUOTE', payload: null })
        }
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        getDepartmentLogo()
        // eslint-disable-next-line
    }, [quote])

    if (isLoading || !quote || !services) {
        return 'Loading'
    }

    return (
        <Box>
            <CallToActionButtons quote={quote} />
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
                        <Typography variant={'h4'}>Tax Quote</Typography>
                        <Typography variant={'h5'}>QUO # {quote?.autoId}</Typography>
                    </Box>
                    <Divider />
                    <Box p={4} minHeight={720}>
                        {quote && <AddressHeader quote={quote} />}
                        {quote && <QuoteLines quote={quote} services={services} />}
                        {quote && <PricingFooter quote={quote} />}
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}

export default ViewQuote
