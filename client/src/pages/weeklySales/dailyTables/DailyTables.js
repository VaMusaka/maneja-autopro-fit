import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { invoicesSelector } from 'redux/selectors'
import { getInvoicesByDateAction } from 'redux/invoices/actions'
import DayTable from './DayTable'

const DailyTables = () => {
    const dispatch = useDispatch()
    const { grouped, loading } = useSelector(invoicesSelector)
    const { byDate } = grouped

    useEffect(() => {
        dispatch(getInvoicesByDateAction())
        // eslint-disable-next-line
    }, [])

    if (loading) {
        return 'Loading'
    }

    return <Box>{byDate && <DayTable invoicesByDate={byDate} />}</Box>
}

export default DailyTables
