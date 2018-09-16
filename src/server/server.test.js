// const expect = require('chai').expect
const supertest = require('supertest')
const server = require('./server.js')

const agent = supertest.agent(server)

describe('server', () => {
  describe('GET /api/corpora', () => {
    it('sends a response', done => {})

    // it('just fails', () => {
    //   expect(1).toBe(1)
    // })

    it('just fails', done => {
      expect.assertions(1)
      const promise = new Promise((resolve, reject) => {
        resolve('foo')
      })

      return promise
        .then(res => {
          expect(res).toEqual('bar')
        })
        .catch(err => {
          throw err
        })
    })
  })
})
