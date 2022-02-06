const request = require('supertest')
const { mockData, status } = require('../utils')

const { authentication } = mockData

describe('DATA SERVICES TESTS', () => {
    let token
    let customerId
    beforeAll(async () => {
        const res = await request(server)
            .post('/api/authentication/sign-in')
            .send(authentication.signIn)

        token = res.body
        console.log(token)
    })

    it('01 GET INVOICES STATS BY MONTH', async () => {
        const res = await request(server)
            .get(`/api/data-service/invoices/by-month`)
            .set({ Authorization: token })
        console.log(res.body)
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('02 GET INVOICES STATS BY YEAR', async () => {
        const res = await request(server)
            .get(`/api/data-service/invoices/by-year`)
            .set({ Authorization: token })
        console.log(res.body)
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('03 GET TOP CUSTOMERS INVOICES STATS', async () => {
        const res = await request(server)
            .get(`/api/data-service/invoices/top-by-customers`)
            .set({ Authorization: token })
        console.log(res.body)
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('04 GET INVOICES COUNT', async () => {
        const res = await request(server)
            .get(`/api/data-service/invoices/count`)
            .set({ Authorization: token })
        console.log(res.body)
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('05 GET INVOICES TOTAL', async () => {
        const res = await request(server)
            .get(`/api/data-service/invoices/total`)
            .set({ Authorization: token })
        console.log(res.body)
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('05.1 GET INVOICES UNPAID TOTAL', async () => {
        const res = await request(server)
            .get('/api/data-service/invoices/unpaid-total')
            .set({ Authorization: token })
        console.log(res.body)
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('05.2 GET INVOICES BY DATE', async () => {
        const res = await request(server)
            .get('/api/data-service/invoices/by-date')
            .set({ Authorization: token })
        console.log(res.body)
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('06 GET INVOICES SERVICE', async () => {
        const res = await request(server)
            .get(`/api/data-service/invoices/stats-by-service`)
            .set({ Authorization: token })
        console.log(res.body)
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    ///  CUSTOMERS
    it('07 GET CUSTOMER COUNT', async () => {
        const res = await request(server)
            .get(`/api/data-service/customers/count`)
            .set({ Authorization: token })
        console.log(res.body)
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('08 GET CUSTOMERS BY TYPE', async () => {
        const res = await request(server)
            .get(`/api/data-service/customers/count-by-type`)
            .set({ Authorization: token })
        console.log(res.body)
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    /// SUPPLIERS
    it('09 GET SUPPLIER COUNT', async () => {
        const res = await request(server)
            .get(`/api/data-service/suppliers/count`)
            .set({ Authorization: token })
        console.log(res.body)
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    /// PURCHASES
    it('10 GET PURCHASES COUNT', async () => {
        const res = await request(server)
            .get(`/api/data-service/purchases/count`)
            .set({ Authorization: token })
        console.log(res.body)
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('11 GET PURCHASES TOTAL', async () => {
        const res = await request(server)
            .get(`/api/data-service/purchases/total`)
            .set({ Authorization: token })
        console.log(res.body)
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('12 GET PURCHASES BY MONTH', async () => {
        const res = await request(server)
            .get(`/api/data-service/purchases/by-month`)
            .set({ Authorization: token })
        console.log(res.body)
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('13 GET PURCHASES BY YEAR', async () => {
        const res = await request(server)
            .get(`/api/data-service/purchases/by-year`)
            .set({ Authorization: token })
        console.log(res.body)
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('14 GET PURCHASES BY CATEGORY', async () => {
        const res = await request(server)
            .get(`/api/data-service/purchases/by-category`)
            .set({ Authorization: token })
        console.log(res.body)
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('15 GET PURCHASES BY SUPPLIER', async () => {
        const res = await request(server)
            .get(`/api/data-service/purchases/by-supplier`)
            .set({ Authorization: token })
        console.log(res.body)
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    /// SERVICES
    it('16 GET SUPPLIERS COUNT', async () => {
        const res = await request(server)
            .get(`/api/data-service/suppliers/count`)
            .set({ Authorization: token })
        console.log(res.body)
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })
})
