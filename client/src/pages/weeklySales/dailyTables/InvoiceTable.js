import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'
import { bulkReview } from 'api/invoices'
import { toast } from 'react-toastify'
import { DailyTablesColumns } from '../constants'
import MuiPallete from 'theme/palette'

const InvoicesTable = ({ invoices }) => {
    // const dispatch = useDispatch
    const [tableInvoices, setTableInvoices] = useState([])
    const [updatedInvoices, setUpdatedInvoices] = useState([])

    useEffect(() => {
        setTableInvoices(invoices)
        //eslint-disable-next-line
    }, [])

    const addOrUpdate = (dataArray, lookup, update) => {
        if (!dataArray.find(({ _id }) => lookup === _id)) {
            dataArray.push(update)
            return dataArray
        }

        dataArray.map((item) => {
            if (item._id === lookup) {
                return update
            }
            return item
        })

        return dataArray
    }

    const handleReviewSelect = (event, row) => {
        const review = event.target.value
        const updateTable = tableInvoices.map((invoice) => {
            if (invoice._id === row._id) {
                invoice.review = review
            }
            return invoice
        })
        const update = addOrUpdate(updatedInvoices, row._id, { _id: row._id, review })

        setUpdatedInvoices(update)
        setTableInvoices(updateTable)
    }

    const handleUpdateInvoices = async () => {
        try {
            await bulkReview(updatedInvoices)
            toast.success('Invoice reviewed')
            setUpdatedInvoices([])
        } catch (error) {
            console.log(error)
            toast.error('Failed to update invoice reviews')
        }
    }

    return (
        <DataTable
            columns={DailyTablesColumns(handleReviewSelect, tableInvoices)}
            conditionalRowStyles={[
                {
                    when: (row) => row.review,
                    style: (row) => ({
                        backgroundColor:
                            row.review === 'accepted'
                                ? MuiPallete.success.main
                                : MuiPallete.error.main,
                    }),
                },
            ]}
            actions={[
                <Button
                    onClick={handleUpdateInvoices}
                    color="primary"
                    key={'update'}
                    variant={'contained'}
                    disabled={updatedInvoices?.length <= 0}
                >
                    UPDATE INVOICES
                </Button>,
            ]}
            data={invoices}
        />
    )
}

InvoicesTable.propTypes = {
    invoices: PropTypes.array,
}

export default InvoicesTable
