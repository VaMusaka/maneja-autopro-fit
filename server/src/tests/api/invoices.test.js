const request = require('supertest')
const { mockData, status } = require('../utils')

const { authentication } = mockData

describe('INVOICES TESTS', () => {
    let token
    let productId
    beforeAll(async () => {
        const res = await request(server)
            .post('/api/authentication/sign-in')
            .send(authentication.signIn)

        token = res.body
        console.log(token)
    })

    it('01 GET INVOICES STATS BY MONTH', async () => {
        const res = await request(server)
            .get(`/api/invoices/by-month`)
            .set({ Authorization: token })
        console.log(res.body)
        // expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('02 GET INVOICES STATS BY CUSTOMER', async () => {
        const res = await request(server)
            .get(`/api/invoices/by-customer`)
            .set({ Authorization: token })
        console.log(res.body)
        // expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('03 SEARCH INVOICES', async () => {
        const res = await request(server)
            .post('/api/invoices/search')
            .send({search: 'Ford'})
            .set({ Authorization: token })

        console.log(res.body)
    })

    it('04 GET INVOICES (ALL)',  async () => {
        const res = await request(server)
          .get('/api/invoices')
          .set({ Authorization: token })
        console.log(res.body)

    })

    it('05 GET INVOICES (QUERY FILTER)',  async () => {
        const res = await request(server)
          .get('/api/invoices?payments.paidInFull=false')
          .set({ Authorization: token })
        console.log(res.body)

    })
})
