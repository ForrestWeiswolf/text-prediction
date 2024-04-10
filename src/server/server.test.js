const supertest = require('supertest')
const server = require('./server.js')

const agent = supertest.agent(server)

describe('server', () => {
  beforeAll(async () => {
    // wait for the server to start
    // TODO: give the server a health endpoint to check here
    // so that we can start when it is ready instead of using a hardcoded guess of how long that takes
    await new Promise(resolve => setTimeout(resolve, 500))
  })

  describe('GET /api/corpora', () => {
    it('sends a response', () => {
      agent
        .get('/api/corpora')
        .expect('Content-Type', /json/)
        .expect(200)
    })
  })
})
