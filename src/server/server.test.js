const request = require('supertest')
const server = require('./server.js')

// TODO: make these less fragile
describe('server', () => {
  beforeAll(async () => {
    // wait for the server to start
    // TODO: give the server a health endpoint to check here
    // so that we can start when it is ready instead of using a hardcoded guess of how long that takes
    await new Promise(resolve => setTimeout(resolve, 500))
  })

  describe('GET /api/corpora', () => {
    it('sends a response with the list of corpora', async () => {
      const expectedCorpora = [{ "name": "Pride and Prejudice", "route": "pride_and_prejudice" }, { "name": "Beowulf", "route": "beowulf" }, { "name": "Frankenstein; or, the Modern Prometheus", "route": "frankenstein" }]

      const response = await request(server)
        .get('/api/corpora')
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.body).toEqual(expectedCorpora)
    })
  })

  describe('GET /api/corpus/:filename/', () => {
    describe('when no words were sent in the query', () => {
      it('responds with most common words', async () => {
        // TODO: should really be most common *initial* words of sentences
        const response = await request(server)
          .get('/api/corpus/pride_and_prejudice?words=[]')
          .expect('Content-Type', /json/)
          .expect(200)

        expect(response.body).toEqual(['the', 'to', 'of'])
      })
    })

    describe('when a word was sent in the query', () => {
      it('responds with most common next word', async () => {
        const response = await request(server)
          .get('/api/corpus/pride_and_prejudice?words=["with"]')
          .expect('Content-Type', /json/)
          .expect(200)

        expect(response.body).toEqual(['the', 'a', 'her'])
      })

      it('responds with empty array if the word is not in the corpus', async () => {
        const response = await request(server)
          .get('/api/corpus/pride_and_prejudice?words=["outgrabe"]')
          .expect('Content-Type', /json/)
          .expect(200)

        expect(response.body).toEqual([])
      })
    })

    describe('when multiple words was sent in the query', () => {
      it('responds with most common next word', async () => {
        const response = await request(server)
          .get('/api/corpus/pride_and_prejudice?words=["with", "her"]')
          .expect('Content-Type', /json/)
          .expect(200)

        expect(response.body).toEqual(['twice',  'brother', 'sister'])
      })
    })
  })
})
