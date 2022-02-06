const request = require('supertest')
const { mockData, status } = require('../utils')

const {user, authentication} = mockData

describe('USERS TESTS', () => {
    let token
    let userId
   beforeAll(async () => {
       const res = await request(server)
           .post('/api/authentication/sign-in')
           .send(authentication.signIn)

       token = res.body;
       console.log(token)
   });

  it('01 GET USERS', async () => {
      const res = await request(server)
        .get(`/api/users`)
        .set({ Authorization: token })
    expect(res.statusCode).toEqual(status.HTTP_200_OK)
  })

  it('02 CREATE USER', async () => {
    const res = await request(server)
        .post(`/api/users`)
        .set({ Authorization: token })
        .send(user.create)
      expect(res.statusCode).toEqual(status.HTTP_200_OK)
      userId = res.body._id
      console.log(userId)
  })

  it('03 UPDATE USER', async () => {
      const res = await request(server)
          .put(`/api/users/${userId}`)
          .set({ Authorization: token })
          .send(user.update)
      console.log(res.body)
      // expect(res.statusCode).toEqual(status.HTTP_200_OK)
  })

    it('04 GET USER', async () => {
        const res = await request(server)
            .get(`/api/users/${userId}`)
            .set({ Authorization: token })
        expect(res.statusCode).toEqual(status.HTTP_200_OK)
    })

    it('05 DELETE USER', async () => {
        const res = await request(server)
            .delete(`/api/users/${userId}`)
            .set({ Authorization: token })
        expect(res.statusCode).toEqual(status.HTTP_204_NO_CONTENT)
    })


})
