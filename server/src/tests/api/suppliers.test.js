const request = require('supertest')
const { mockData, status } = require('../utils')

const { supplier, authentication } = mockData

describe('SUPPLIERS TESTS', () => {
    let token
    let supplierId
    beforeAll(async () => {
        const res = await request(server).post('/api/authentication/sign-in').send(authentication.signIn)

        token = res.body
        console.log(token)
    })

    it('01 GET SUPPLIERS', async () => {
        const res = await request(server).get(`/api/suppliers`).set({ Authorization: token })
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('02 CREATE SUPPLIER', async () => {
        const res = await request(server).post(`/api/suppliers`).set({ Authorization: token }).send(supplier.create)
        supplierId = res.body._id
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('03 UPDATE SUPPLIER', async () => {
        const res = await request(server)
            .put(`/api/suppliers/${supplierId}`)
            .set({ Authorization: token })
            .send(supplier.update)
        console.log(res.body, supplierId)
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('04 GET SUPPLIER', async () => {
        const res = await request(server).get(`/api/suppliers/${supplierId}`).set({ Authorization: token })
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('05 DELETE SUPPLIER', async () => {
        const res = await request(server).delete(`/api/suppliers/${supplierId}`).set({ Authorization: token })
        expect(res.statusCode).toEqual(status.HTTP_204_NO_CONTENT)
    })
})
