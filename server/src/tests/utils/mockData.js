const faker = require('faker')

faker.locale = 'en_GB'

const name = faker.name.findName()
const email = faker.internet.email()
const phone = '07761734106'
const password = 'EliteOrganics123!'
const emailVerificationToken = null
const passwordResetToken = null

const address = {
    line1: faker.address.streetName(),
    line2: faker.address.secondaryAddress(),
    city: faker.address.city(),
    county: faker.address.state(),
    postalCode: faker.address.zipCode()
}

const adminUser = {
    email: 'pmusaka@instantia.co.uk',
    password
}

const authentication = {
    signUp: {
        email: adminUser.email,
        name,
        password,
        phone,
        passwordConfirmation: password
    },
    signIn: adminUser,
    emailVerificationToken,
    passwordResetToken,
    address
}

const user = {
    create: {
        name,
        email,
        phone,
        password
    },
    update: {
        name: faker.name.findName()
    }
}

const customer = {
    create: {
        name: `${faker.name.findName()} ${faker.name.lastName()}`,
        town: faker.address.city(),
        postalCode: faker.address.zipCode(),
        phone: faker.phone.phoneNumber('07#########'),
        email: faker.internet.email()
    },
    update: {
        paymentTerms: '7 days'
    }
}

const supplier = {
    create: {
        name: faker.company.companyName(),
        town: faker.address.city(),
        phone: faker.phone.phoneNumber('07#########')
    },
    update: {
        town: faker.address.city()
    }
}

const purchaseCategory = {
    create: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription()
    },
    update: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription()
    }
}

const product = {
    create: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        unitPrice: faker.commerce.price()
    },
    update: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        unitPrice: faker.commerce.price()
    }
}

const purchase = {
    create: {
        paid: true,
        invoicedTo: 'AutoPro Fit',
        warranty: '30 Days',
        details: 'Test Purchase',
        amount: 86.25,
        vat: 17.25,
        total: 103.5,
        invoice: '609962d2a99be243e1ee9335',
        supplier: '6097f0df2ca8623e039adb05',
        supplierInvoiceNumber: '04205033',
        supplierInvoiceDate: '2012-09-02',
        purchaseCategory: '6097f0ce88c1543dff50cd0d'
    },
    update: {
        details: 'Test Purchase Details Update'
    }
}

const service = {
    create: {
        title: 'Tyres',
        description: 'Tyres puncture repairs or replacements',
        unitPrice: 50,
        unit: 'item'
    },
    update: {
        title: faker.lorem.words(),
        description: faker.commerce.productDescription(),
        unitPrice: 60,
        unit: 'item'
    }
}

module.exports = {
    authentication,
    user,
    customer,
    purchaseCategory,
    supplier,
    purchase,
    service,
    product
}
