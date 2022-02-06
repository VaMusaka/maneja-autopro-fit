const request = require('supertest')
const { mockData, status } = require('../utils')

const { purchase, authentication } = mockData

describe('PURCHASES TESTS', () => {
    let token
    let purchaseId
    beforeAll(async () => {
        const res = await request(server)
            .post('/api/authentication/sign-in')
            .send(authentication.signIn)

        token = res.body
        console.log(token)
    })

    it('01 GET PURCHASES', async () => {
        const res = await request(server)
            .get(`/api/purchases`)
            .set({ Authorization: token })

        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('02 CREATE PURCHASE', async () => {
        const res = await request(server)
            .post(`/api/purchases`)
            .set({ Authorization: token })
            .send(purchase.create)
        purchaseId = res.body._id
        console.log(res.body)
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('03 UPDATE PURCHASE', async () => {
        const res = await request(server)
            .put(`/api/purchases/${purchaseId}`)
            .set({ Authorization: token })
            .send(purchase.update)
        console.log(res.body, purchaseId)
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('04 GET PURCHASE', async () => {
        const res = await request(server)
            .get(`/api/purchases/${purchaseId}`)
            .set({ Authorization: token })
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('05 DELETE PURCHASE', async () => {
        const res = await request(server)
            .delete(`/api/purchases/${purchaseId}`)
            .set({ Authorization: token })
        expect(res.statusCode).toEqual(status.HTTP_204_NO_CONTENT)
    })
})
