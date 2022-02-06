import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { MuiDrawer } from 'components/common'
import CreatePurchase from 'pages/purchases/createPurchase'
import DataTable from 'react-data-table-component'
import { purchaseTableColumns } from 'pages/purchases/constants'
import PurchaseTableExpandableRow from 'pages/purchases/purchaseTable/PurchaseTableExpandableRow'
import { getPurchases } from 'api/purchases'
import PropTypes from 'prop-types'
import { MuiStyles } from 'theme'

const ProductPurchases = ({ product }) => {
    const [purchases, setPurchases] = useState(null)
    const classes = MuiStyles()

    useEffect(() => {
        ;(async () => {
            const { data } = await getPurchases({ product: product._id })

            setPurchases(data)
        })()
        // eslint-disable-next-line
    }, [])

    if (!product) {
        return 'Loading'
    }

    return (
        <Box className={classes.mt3}>
            <DataTable
                title={'PRODUCT PURCHASES'}
                fixedHeader
                actions={[
                    <MuiDrawer key={'create'} openButtonText={'Create Purchase'}>
                        <CreatePurchase product={product} />
                    </MuiDrawer>,
                ]}
                highlightOnHover
                pagination
                persistTableHead
                responsive
                striped
                subHeaderAlign="right"
                subHeaderWrap
                columns={purchaseTableColumns}
                expandableRows
                expandableRowsComponent={PurchaseTableExpandableRow}
                data={purchases || []}
            />
        </Box>
    )
}

ProductPurchases.propTypes = {
    product: PropTypes.object.isRequired,
}

export default ProductPurchases
