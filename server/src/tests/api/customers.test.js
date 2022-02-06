const request = require('supertest')
const { mockData, status } = require('../utils')

const { customer, authentication } = mockData

describe('CUSTOMERS TESTS', () => {
    let token
    let customerId
    beforeAll(async () => {
        const res = await request(server).post('/api/authentication/sign-in').send(authentication.signIn)

        token = res.body
        console.log(token)
    })

    it('01 GET CUSTOMERS', async () => {
        const res = await request(server).get(`/api/customers`).set({ Authorization: token })
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('02 CREATE CUSTOMER', async () => {
        const res = await request(server).post(`/api/customers`).set({ Authorization: token }).send(customer.create)
        customerId = res.body._id
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('03 UPDATE CUSTOMER', async () => {
        const res = await request(server)
            .put(`/api/customers/${customerId}`)
            .set({ Authorization: token })
            .send(customer.update)
        console.log(res.body, customerId)
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('04 GET CUSTOMER', async () => {
        const res = await request(server).get(`/api/customers/${customerId}`).set({ Authorization: token })
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('05 DELETE CUSTOMER', async () => {
        const res = await request(server).delete(`/api/customers/${customerId}`).set({ Authorization: token })
        expect(res.statusCode).toEqual(status.HTTP_204_NO_CONTENT)
    })

    it('06 SEARCH INVOICES', async () => {
        const res = await request(server)
            .post('/api/customers/search')
            .send({search: 'skoda'})
            .set({ Authorization: token })

        console.log(res.body)
    })
})
