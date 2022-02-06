import { StyleSheet } from '@react-pdf/renderer'

export default StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Oswald',
    },
    author: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 18,
        margin: 12,
        fontFamily: 'Oswald',
    },
    text: {
        margin: 12,
        fontSize: 10,
        textAlign: 'justify',
        fontFamily: 'Times-Roman',
    },
    image: {
        margin: 12,
    },
    header: {
        fontSize: 10,
        marginHorizontal: 12,
        textAlign: 'justify',
        color: 'grey',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 10,
        bottom: 20,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    tableColumnOne: {
        fontSize: 10,
        marginHorizontal: 12,
        textAlign: 'justify',
        fontFamily: 'Times-Roman',
        width: '10%',
    },
    tableColumnTwo: {
        fontSize: 10,
        marginHorizontal: 12,
        textAlign: 'justify',
        fontFamily: 'Times-Roman',
        width: '20%',
    },
    tableColumnFour: {
        fontSize: 10,
        marginHorizontal: 12,
        textAlign: 'justify',
        fontFamily: 'Times-Roman',
        width: '40%',
    },
    tableColumnFive: {
        fontSize: 10,
        marginHorizontal: 12,
        textAlign: 'justify',
        fontFamily: 'Times-Roman',
        width: '50%',
    },
    w1: {
        width: '10%',
    },
    w2: {
        width: '20%',
    },
    w3: {
        width: '30%',
    },
    w4: {
        width: '40%',
    },
    w5: {
        width: '50%',
    },
    divider: {
        borderBottom: '1px solid #ccc',
        marginVertical: 10,
    },
    marginVertical: {
        marginVertical: 10,
    },
    marginHorizontal: {
        marginHorizontal: 10,
    },
    downloadLink: {
        textDecoration: 'none',
    },
})
