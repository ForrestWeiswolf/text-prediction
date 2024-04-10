const supertest = require('supertest')
const server = require('./server.js')

const agent = supertest.agent(server)

describe('server', () => {
  describe('GET /api/corpora', () => {
    it('sends a response', () => {
      agent
        .get('/api/corpora')
        .expect('Content-Type', /json/)
        .expect(200)
    })
  })
})
