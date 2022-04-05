import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import Default from 'components/layout/default'
import { MuiStyles } from 'theme'
import Error404 from 'assets/img/error-404.png'
import clsx from 'clsx'

const NotFound = () => {
    const classes = MuiStyles()
    return (
        <Default title="Error 404">
            <Box
                height="100%"
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
            >
                <img alt="error-404" src={Error404} height="340" />
                <Box p={3}>
                    <Typography variant="body1" className={clsx(classes.fw3)}>
                        PAGE NOT FOUND
                    </Typography>
                </Box>
                <Box
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="row"
                >
                    <Box p={1} width={200}>
                        <Button variant="outlined" color="primary" fullWidth>
                            GO BACK
                        </Button>
                    </Box>
                    <Box p={1} width={200}>
                        <Button variant="outlined" color="primary" fullWidth>
                            HOME
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Default>
    )
}

export default NotFound
