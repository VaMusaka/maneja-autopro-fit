/* eslint-disable */
const request = require('supertest')
const app = require('../../server')

global.server

beforeAll(done => {
  server = app.listen(5001, async () => {
    global.agent = request.agent(server)
    done()
  })
})

afterAll(async () => {
  await server.close()
})

