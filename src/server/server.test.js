const expect = require('chai').expect
const supertest = require('supertest')
const server = require('./index.js')

const agent = supertest.agent(server)

describe('server', () => {
  describe('GET /api/corpora', () => {
    it('jsons back an array', () => {
      agent
        .get('/api/corpora')
        .expect('Content-Type', /json/)
        .expect(res => !!res.body.length)
        .expect(200)
    })
  })
})
