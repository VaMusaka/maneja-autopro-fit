import React from 'react'
import DefaultLayout from 'components/layout/default'
import DailyTables from './dailyTables'

const WeeklySales = () => {
    return (
        <DefaultLayout title={'Weekly Sales'}>
            <DailyTables />
        </DefaultLayout>
    )
}

export default WeeklySales
