const address = {
    line1: '24 Wood Street',
    line2: 'Park Village',
    city: 'Wolverhampton',
    postalCode: 'WV10 9DS',
}

export const companyDetails = {
    name: 'AutoPro Fit',
    appLogo: 'https://maneja-assets.s3.eu-west-2.amazonaws.com/appLogo.jpeg',
    address,
    departments: [
        {
            name: 'AutoPro Fit',
            displayName: 'AutoPro Fit Ltd',
            logo: 'https://maneja-assets.s3.eu-west-2.amazonaws.com/appLogo.jpeg',
            showOnInvoice: true,
            invoicesVatExempt: false,
            invoice: {
                address,
                email: 'autoprofit@hotmail.co.uk',
                phone: '01902 863641',
                vatNo: '175754180',
                bank: {
                    name: 'HSBC',
                    account: '02798662',
                    sortCode: '40-47-11',
                },
            },
        },
        {
            name: 'MOT',
            displayName: 'MOTS Testing Ltd',
            logo: 'https://maneja-assets.s3.eu-west-2.amazonaws.com/motLogo.png',
            showOnInvoice: true,
            invoicesVatExempt: true,
            invoice: {
                address,
                email: 'mottestingltd@hotmail.com',
                phone: '',
                vatNo: '',
                bank: {
                    name: 'Natwest',
                    account: '83311467',
                    sortCode: '55-70-46',
                },
            },
        },
    ],
}

export const invoiceSettings = {
    useDepartments: true,
}
