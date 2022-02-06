import UserTableActions from './userTable/UserTableActions'

export const userFormFields = [
    {
        component: 'MuiTextField',
        name: 'name',
        label: 'Full Name',
    },
    {
        component: 'MuiTextField',
        name: 'email',
        label: 'User Email',
    },
    {
        component: 'MuiTextField',
        name: 'phone',
        label: 'User Phone',
    },
    {
        component: 'MuiCheckBox',
        name: 'emailVerified',
        label: 'User Email Verified',
    },
    {
        component: 'MuiSelectField',
        name: 'role',
        label: 'User Type',
        options: [
            { value: 'Staff', label: 'Staff' },
            { value: 'Admin', label: 'Admin' },
        ],
    },
    {
        component: 'MuiTextField',
        name: 'password',
        label: 'Password',
        type: 'password',
    },
    {
        component: 'MuiTextField',
        name: 'passwordConfirmation',
        label: 'Confirm Password',
        type: 'password',
    },
]

export const userTableColumns = [
    {
        name: 'Name',
        selector: (row) => row.name,
        sortable: true,
    },
    {
        name: 'Email',
        selector: (row) => row.email,
        sortable: true,
    },
    {
        name: 'Role',
        selector: (row) => row.role,
        sortable: true,
    },
    {
        name: 'Actions',
        selector: (row) => UserTableActions(row),
    },
]
