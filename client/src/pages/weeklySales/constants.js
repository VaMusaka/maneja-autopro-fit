import React from 'react'
import { MuiRadioBox } from 'components/common/inputs'

export const DailyTablesColumns = (handleReviewSelect, tableInvoices) => [
    {
        name: 'Invoice No',
        selector: (row) => '#' + row?.autoId,
        sortable: true,
    },
    {
        name: 'Vehicle Model - Reg ',
        selector: (row) => row.vehicleModel + ' - ' + row.vehicleReg?.toUpperCase(),
        sortable: true,
    },
    {
        name: 'Total ',
        selector: (row) => row.total,
        sortable: true,
    },
    {
        name: 'Review',
        cell: (row) => (
            <MuiRadioBox
                onChange={(event) => handleReviewSelect(event, row)}
                name={'review'}
                value={tableInvoices?.find(({ _id }) => _id === row._id)?.review || row.review}
                options={[
                    { value: 'accepted', label: 'Accept', isDisable: false },
                    { value: 'rejected', label: 'Reject', isDisable: false },
                ]}
            />
        ),
    },
]
