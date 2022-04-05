import React from 'react'
import { Button } from '@mui/material'
import { useHistory } from 'react-router-dom'

const BackButton = () => {
    const history = useHistory()
    return (
        <Button variant={'contained'} color={'primary'} onClick={() => history.goBack()}>
            BACK
        </Button>
    )
}

export default BackButton
