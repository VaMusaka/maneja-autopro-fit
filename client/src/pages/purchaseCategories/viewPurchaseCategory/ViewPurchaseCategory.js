import React from 'react'
import PropTypes from 'prop-types'
import { Box, Divider, Grid, Typography } from '@mui/material'
import { MuiStyles } from 'theme'
import { BasicInfoGrid } from 'components/common'
import dayjs from 'dayjs'

const ViewPurchaseCategory = ({ purchaseCategory }) => {
    const classes = MuiStyles()
    return (
        <Box>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        {purchaseCategory.name || 'Purchase Category'}
                    </Typography>
                </Grid>
            </Grid>

            <Box className={classes.pt3}>
                <Divider />
            </Box>

            <BasicInfoGrid
                data={[
                    { title: 'Name', info: purchaseCategory.name },
                    { title: 'Description', info: purchaseCategory.description },
                    {
                        title: 'Created',
                        info: dayjs(purchaseCategory.created).format('DD MMM YYYY'),
                    },
                    {
                        title: 'Last Updated',
                        info: dayjs(purchaseCategory.updated).format('DD MMM YYYY'),
                    },
                ]}
            />
        </Box>
    )
}

ViewPurchaseCategory.propTypes = {
    purchaseCategory: PropTypes.object.isRequired,
}

export default ViewPurchaseCategory
