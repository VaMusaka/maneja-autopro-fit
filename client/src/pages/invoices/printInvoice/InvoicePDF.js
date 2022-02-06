import React, { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import PropTypes from 'prop-types'
import { Page, Text, PDFDownloadLink, Font, Document, Image, View } from '@react-pdf/renderer'
import { companyDetails } from 'config'
import { getInvoiceDepartment } from '../constants'
import { getBase64FromUrl } from 'utils'
import dayjs from 'dayjs'
import styles from './styles'

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
})

// Create styles
const InvoicePdfDoc = ({ invoice }) => {
    const [logo, setLogo] = useState(null)
    const [department, setDepartment] = useState(null)

    useEffect(() => {
        const invoiceDepartment = getInvoiceDepartment(invoice)
        setDepartment(invoiceDepartment)

        const logoUrl = invoiceDepartment?.logo || companyDetails?.appLogo
        getBase64FromUrl(logoUrl, (logo) => setLogo(logo))

        // eslint-disable-next-line
    }, []);

    const generateFooter = () => {
        let footer = ''

        footer += `${department?.invoice?.address?.line1} ${department?.invoice?.address?.line2} ${department?.invoice?.address?.city} ${department?.invoice?.address?.postalCode} \n`
        if (department?.invoice?.email) {
            footer += `email:  ${department?.invoice?.email}, `
        }

        if (department?.invoice?.phone) {
            footer += `phone:  ${department?.invoice?.phone} \n`
        }

        if (department?.invoice?.bank) {
            footer += `${department?.invoice?.bank?.name} AC: ${department?.invoice?.bank?.account} ~ SC: ${department?.invoice?.bank?.sortCode}\n`
        }

        if (department?.invoice?.vatNo) {
            footer += `VAT NO: ${department?.invoice?.vatNo}`
        }

        return footer
    }

    return (
        <Document>
            <Page style={styles.body} wrap size={'A4'}>
                <Box style={styles.w3}>{logo && <Image src={logo} style={styles.image} />}</Box>
                <Box>
                    <Text style={styles.text}>
                        {companyDetails.name} {'\n'}
                        {department?.showOnInvoice &&
                            department?.showOnInvoice &&
                            `${invoice?.department} \n`}
                        {companyDetails.address.line1}
                        {companyDetails.address.line2} {'\n'}
                        {companyDetails.address.city} {'\n'}
                        {companyDetails.address.postalCode} {'\n'}
                    </Text>
                </Box>

                <Box>
                    <Text style={styles.text}>
                        Invoiced To: {'\n'}
                        {invoice?.customer?.name} {'\n'}
                        {invoice?.customer?.addressLine1 && `${invoice?.customer?.addressLine1} \n`}
                        {invoice?.customer?.addressLine2 && `${invoice?.customer?.addressLine2} \n`}
                        {invoice?.customer?.town} {'\n'}
                        {invoice?.customer?.postalCode}
                    </Text>
                </Box>

                <View style={styles.row}>
                    <Box style={styles.w2}>
                        <Text style={styles.header}> Invoice #{invoice.autoId}</Text>
                    </Box>
                    <Box style={styles.w3}>
                        <Text style={styles.text}>
                            {dayjs(invoice?.invoiceDate).format('DD/MM/YYYY')}
                        </Text>
                    </Box>
                </View>
                <Text style={styles.text}>Invoice Lines</Text>

                <View style={styles.row}>
                    <Text style={styles.tableColumnTwo}>Item</Text>
                    <Text style={styles.tableColumnFive}>Description</Text>
                    <Text style={styles.tableColumnOne}>Amount</Text>
                    <Text style={styles.tableColumnOne}>VAT</Text>
                    <Text style={styles.tableColumnOne}>Total</Text>
                </View>

                <Box style={styles.divider} />

                {invoice?.lines?.map((line, index) => (
                    <View style={styles.row} key={index}>
                        <Text style={styles.tableColumnTwo}>{line.service.title}</Text>
                        <Text style={styles.tableColumnFive}>
                            {line?.description || line?.service?.description}
                        </Text>
                        <Text style={styles.tableColumnOne}>{`£ ${
                            line?.charged?.toFixed(2) || 0.0
                        }`}</Text>
                        <Text style={styles.tableColumnOne}>{`£ ${
                            line?.addVat ? (line.charged * 0.2).toFixed(2) : '0.00'
                        }`}</Text>
                        <Text style={styles.tableColumnOne}>{`£ ${
                            line?.addVat ? (line.charged * 1.2).toFixed(2) : line.charged.toFixed(2)
                        }`}</Text>
                    </View>
                ))}

                <View style={styles.row}>
                    <View style={styles.w2}>
                        <Text style={styles.text}>
                            Sub Total {'\n'}
                            VAT {'\n'}
                            Total {'\n'}
                        </Text>
                        <Box style={styles.divider} />
                        <Text style={styles.text}>Outstanding</Text>
                    </View>
                    <View style={styles.w2}>
                        <Text style={styles.text}>
                            {invoice?.subTotal?.toFixed(2) || 0.0} {'\n'}
                            {invoice?.vatAmount?.toFixed(2) || 0.0} {'\n'}
                            {invoice?.total?.toFixed(2) || 0.0} {'\n'}
                        </Text>
                        <Box style={styles.divider} />

                        <Text style={styles.text}>
                            {`£ ${invoice.balancePayable.toFixed(2) || 0.0}`}
                        </Text>
                    </View>
                </View>
                {department?.invoice && (
                    <Text style={styles.pageNumber} render={generateFooter} fixed />
                )}
            </Page>
        </Document>
    )
}

const InvoicePdf = ({ invoice }) => (
    <Box>
        <PDFDownloadLink
            style={styles.downloadLink}
            document={<InvoicePdfDoc invoice={invoice} />}
            fileName={`Invoice-${invoice.autoId}.pdf`}
        >
            {({ loading }) =>
                loading ? `...` : <Button variant={'contained'}>DOWNLOAD INVOICE</Button>
            }
        </PDFDownloadLink>
    </Box>
)

InvoicePdf.propTypes = {
    invoice: PropTypes.object.isRequired,
}
InvoicePdfDoc.propTypes = {
    invoice: PropTypes.object.isRequired,
}

export default InvoicePdf
