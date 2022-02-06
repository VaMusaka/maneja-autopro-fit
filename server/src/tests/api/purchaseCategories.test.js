const request = require('supertest')
const { mockData, status } = require('../utils')

const { purchaseCategory, authentication } = mockData

describe('PURCHASE CATEGORIES TESTS', () => {
    let token
    let purchaseCategoryId
    beforeAll(async () => {
        const res = await request(server)
            .post('/api/authentication/sign-in')
            .send(authentication.signIn)

        token = res.body
        console.log(token)
    })

    it('01 GET PURCHASE CATEGORIES', async () => {
        const res = await request(server)
            .get(`/api/purchase-categories`)
            .set({ Authorization: token })
        console.log(res.body)
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('02 CREATE PURCHASE CATEGORY', async () => {
        const res = await request(server)
            .post(`/api/purchase-categories`)
            .set({ Authorization: token })
            .send(purchaseCategory.create)
        purchaseCategoryId = res.body._id
        console.log(res.body)
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('03 UPDATE PURCHASE CATEGORY', async () => {
        const res = await request(server)
            .put(`/api/purchase-categories/${purchaseCategoryId}`)
            .set({ Authorization: token })
            .send(purchaseCategory.update)
        console.log(res.body, purchaseCategoryId)
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('04 GET PURCHASE CATEGORY', async () => {
        const res = await request(server)
            .get(`/api/purchase-categories/${purchaseCategoryId}`)
            .set({ Authorization: token })
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('05 DELETE PURCHASE CATEGORY', async () => {
        const res = await request(server)
            .delete(`/api/purchase-categories/${purchaseCategoryId}`)
            .set({ Authorization: token })
        expect(res.statusCode).toEqual(status.HTTP_204_NO_CONTENT)
    })
})
