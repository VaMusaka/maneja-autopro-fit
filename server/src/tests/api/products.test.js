const request = require('supertest')
const { mockData, status } = require('../utils')

const { product, authentication } = mockData

describe('PRODUCTS TESTS', () => {
    let token
    let productId
    beforeAll(async () => {
        const res = await request(server)
            .post('/api/authentication/sign-in')
            .send(authentication.signIn)

        token = res.body
        console.log(token)
    })

    it('01 GET PRODUCTS', async () => {
        const res = await request(server)
            .get(`/api/purchase-categories`)
            .set({ Authorization: token })
        console.log(res.body)
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('02 CREATE PRODUCT', async () => {
        const res = await request(server)
            .post(`/api/purchase-categories`)
            .set({ Authorization: token })
            .send(product.create)
        productId = res.body._id
        console.log(res.body)
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('03 UPDATE PRODUCT', async () => {
        const res = await request(server)
            .put(`/api/purchase-categories/${productId}`)
            .set({ Authorization: token })
            .send(product.update)
        console.log(res.body, productId)
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('04 GET PRODUCT', async () => {
        const res = await request(server)
            .get(`/api/purchase-categories/${productId}`)
            .set({ Authorization: token })
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('05 DELETE PRODUCT', async () => {
        const res = await request(server)
            .delete(`/api/purchase-categories/${productId}`)
            .set({ Authorization: token })
        expect(res.statusCode).toEqual(status.HTTP_204_NO_CONTENT)
    })
})
