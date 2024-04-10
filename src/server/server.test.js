const request = require('supertest')
const server = require('./server.js')

describe('server', () => {
  beforeAll(async () => {
    // wait for the server to start
    // TODO: give the server a health endpoint to check here
    // so that we can start when it is ready instead of using a hardcoded guess of how long that takes
    await new Promise(resolve => setTimeout(resolve, 500))
  })

  describe('GET /api/corpora', () => {
    it('sends a response with the list of corpora', async () => {
      // TODO: make this less fragile
      const expectedCorpora = [{ "name": "Pride and Prejudice", "route": "pride_and_prejudice" }, { "name": "Beowulf", "route": "beowulf" }, { "name": "Frankenstein; or, the Modern Prometheus", "route": "frankenstein" }]

      const response = await request(server)
        .get('/api/corpora')
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.body).toEqual(expectedCorpora)
    })
  })
})
