import React from 'react'
import DefaultLayout from 'components/layout/default'
import UserTable from './userTable'

const Users = () => (
    <DefaultLayout title={'Users'}>
        <UserTable />
    </DefaultLayout>
)

export default Users
