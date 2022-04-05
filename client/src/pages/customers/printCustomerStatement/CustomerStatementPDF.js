import React, { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import PropTypes from 'prop-types'
import { Page, Text, PDFDownloadLink, Font, Document, Image, View } from '@react-pdf/renderer'
import { companyDetails } from 'config'
import { getBase64FromUrl } from 'utils'
import dayjs from 'dayjs'
import styles from './styles'
import { MuiStyles } from 'theme'

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
})

const CustomerStatementPdfDoc = ({ invoices, customer }) => {
    const [logo, setLogo] = useState(null)

    useEffect(() => {
        const logoUrl = companyDetails?.appLogo
        getBase64FromUrl(logoUrl, (logo) => setLogo(logo))

        // eslint-disable-next-line
    }, []);

    const generateFooter = () => {
        let footer = ''

        footer += `${companyDetails?.address?.line1} ${companyDetails?.address?.line2} ${companyDetails?.address?.city} ${companyDetails?.address?.postalCode} \n`

        return footer
    }

    return (
        <Document>
            <Page style={styles.body} wrap size={'A4'}>
                <Box style={styles.w3}>{logo && <Image src={logo} style={styles.image} />}</Box>
                <Box>
                    <Text style={styles.text}>
                        {companyDetails.name} {'\n'}
                        {companyDetails.address.line1}
                        {companyDetails.address.line2} {'\n'}
                        {companyDetails.address.city} {'\n'}
                        {companyDetails.address.postalCode} {'\n'}
                    </Text>
                </Box>

                <Box>
                    <Text style={styles.text}>
                        Customer : {'\n'}
                        {customer?.name} {'\n'}
                        {customer?.addressLine1 && `${customer?.addressLine1} \n`}
                        {customer?.addressLine2 && `${customer?.addressLine2} \n`}
                        {customer?.town} {'\n'}
                        {customer?.postalCode}
                    </Text>
                </Box>

                <View style={styles.row}>
                    <Box style={styles.w2}>
                        <Text style={styles.header}> Statement </Text>
                    </Box>
                    <Box style={styles.w3}>
                        <Text style={styles.text}>{dayjs().format('DD/MM/YYYY')}</Text>
                    </Box>
                </View>

                <Text style={styles.text}>Unpaid Invoices</Text>

                <View style={styles.row}>
                    <Text style={styles.tableColumnTwo}>Invoice No</Text>
                    <Text style={styles.tableColumnTwo}>Invoice Date</Text>
                    <Text style={styles.tableColumnFour}>Vehicle Model - Reg</Text>
                    <Text style={styles.tableColumnOne}> Total</Text>
                    <Text style={styles.tableColumnTwo}>Outstanding</Text>
                </View>

                <Box style={styles.divider} />

                {invoices?.map(
                    (
                        { autoId, invoiceDate, vehicleReg, vehicleModel, total, balancePayable },
                        index
                    ) => (
                        <View style={styles.row} key={index}>
                            <Text style={styles.tableColumnTwo}># {autoId}</Text>
                            <Text style={styles.tableColumnTwo}>
                                {dayjs(invoiceDate).format('DD MMM YYYY')}
                            </Text>
                            <Text style={styles.tableColumnFour}>
                                {vehicleModel} - {vehicleReg}
                            </Text>
                            <Text style={styles.tableColumnOne}>{`£ ${
                                total?.toFixed(2) || 0.0
                            }`}</Text>
                            <Text style={styles.tableColumnTwo}>{`£ ${
                                balancePayable?.toFixed(2) || '0.00'
                            }`}</Text>
                        </View>
                    )
                )}

                <Text style={styles.pageNumber} render={generateFooter} fixed />
            </Page>
        </Document>
    )
}

const CustomerStatementPDF = ({ invoices, customer, department }) => {
    const classes = MuiStyles()
    return (
        <Box>
            <PDFDownloadLink
                style={styles.downloadLink}
                document={
                    <CustomerStatementPdfDoc
                        invoices={invoices}
                        customer={customer}
                        department={department}
                    />
                }
                fileName={`Customer Statement ${customer?.autoId}.pdf`}
            >
                {({ loading }) =>
                    loading ? (
                        `...`
                    ) : (
                        <Button className={classes.ml2} variant={'contained'}>
                            {department} STATEMENTS
                        </Button>
                    )
                }
            </PDFDownloadLink>
        </Box>
    )
}

CustomerStatementPDF.propTypes = {
    invoices: PropTypes.object.isRequired,
    customer: PropTypes.object.isRequired,
    department: PropTypes.string.isRequired,
}
CustomerStatementPdfDoc.propTypes = {
    invoices: PropTypes.object.isRequired,
    customer: PropTypes.object.isRequired,
    department: PropTypes.string.isRequired,
}

export default CustomerStatementPDF
