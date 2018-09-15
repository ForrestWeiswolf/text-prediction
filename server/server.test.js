const expect = require('chai').expect
const supertest = require('supertest')
const server = require('./index.js')

const agent = supertest.agent(server)

describe('server', () => {
})
