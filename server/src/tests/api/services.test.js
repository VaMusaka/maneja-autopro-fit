const request = require('supertest')
const { mockData, status } = require('../utils')

const { service, authentication } = mockData

describe('SERVICES TESTS', () => {
    let token
    let serviceId
    beforeAll(async () => {
        const res = await request(server)
            .post('/api/authentication/sign-in')
            .send(authentication.signIn)

        token = res.body
        console.log(token)
    })

    it('01 GET SERVICES', async () => {
        const res = await request(server)
            .get(`/api/services`)
            .set({ Authorization: token })
        console.log(res.body)
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('02 CREATE SERVICE', async () => {
        const res = await request(server)
            .post(`/api/services`)
            .set({ Authorization: token })
            .send(service.create)
        serviceId = res.body._id
        console.log(res.body)
        // expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('03 UPDATE SERVICE', async () => {
        const res = await request(server)
            .put(`/api/services/${serviceId}`)
            .set({ Authorization: token })
            .send(service.update)
        console.log(res.body, serviceId)
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('04 GET SERVICE', async () => {
        const res = await request(server)
            .get(`/api/services/${serviceId}`)
            .set({ Authorization: token })
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    // it('05 DELETE SERVICE', async () => {
    //     const res = await request(server)
    //         .delete(`/api/services/${serviceId}`)
    //         .set({ Authorization: token })
    //     expect(res.statusCode).toEqual(status.HTTP_204_NO_CONTENT)
    // })
})
