const supertest = require('supertest')
const server = require('./server.js')

const agent = supertest.agent(server)

xdescribe('server', () => {
  describe('GET /api/corpora', () => {
    xit('just fails', () => {
      // expect.assertions(1)
      const promise = new Promise((resolve, reject) => {
        try {
          resolve('foo')
        } catch(e) {
          reject(e)
        }
      })

      promise.then(res => {
        expect(res).toEqual('bar')
      })
    })

    xit('just passes', () => {
      // expect.assertions(1)
      const promise = new Promise((resolve, reject) => {
        try {
          resolve('foo')
        } catch(e) {
          reject(e)
        }
      })

      promise.then(res => {
        expect(res).toEqual('foo')
      })
    })

    it('sends a response', () => {
      agent
        .get('/api/corpora')
        .expect('Content-Type', /json/)
        .expect(200)
    })
  })
})
