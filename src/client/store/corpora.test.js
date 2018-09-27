import { expect } from 'chai'
import axios from 'axios'
import { spy } from 'sinon'
import MockAdapter from 'axios-mock-adapter'
import { switchCorpus, getCorpora, fetchCorpora } from './index'

describe('switchCorpus', () => {
  it('is a function', () => {
    expect(switchCorpus).to.be.a('function')
  })

  it('creates an action with type SWITCH_CORPUS', () => {
    expect(switchCorpus('foo').type).to.equal('SWITCH_CORPUS')
  })

  it('creates an action with passed argument as newText prop', () => {
    expect(switchCorpus('foo').corpus).to.equal('foo')
  })
})

describe('getCorpora', () => {
  it('is a function', () => {
    expect(getCorpora).to.be.a('function')
  })

  it('creates an action with type GET_CORPORA', () => {
    expect(getCorpora('foo').type).to.equal('GET_CORPORA')
  })

  it('creates an action with passed argument as newText prop', () => {
    expect(getCorpora('foo').corpora).to.equal('foo')
  })
})

describe('fetchCorpora', () => {
  // Due to some kind of issue with axios-mock-adaptor, these tests fail unless
  // the tests for fetchSuggestions are commented out, and vice-versa.
  // If run separately, both pass, but they can't be run at the same time
  // until I find a fix for this.

  const testResponse = ['foo', 'bar', 'baz']
  const replySpy = spy(config => {
    return [200, testResponse]
  })

  const mock = new MockAdapter(axios)
  mock.onGet('/api/corpora/').reply(replySpy)

  afterAll(() => {
    mock.restore()
  })

  it('is a function', () => {
    expect(fetchCorpora).to.be.a('function')
  })

  it('returns a function', () => {
    expect(fetchCorpora()).to.be.a('function')
  })

  describe('returned thunk', () => {
    let thunk
    beforeEach(() => {
      thunk = fetchCorpora()
    })

    it('calls /api/corpora', done => {
      thunk(() => {}).then(() => {
        expect(replySpy.called).to.be.true
        done()
      })
    })

    it('dispatches a GET_CORPORA with the response', done => {
      const dispatchSpy = spy()
      thunk(dispatchSpy).then(() => {
        expect(dispatchSpy.lastCall.args[0]).to.deep.equal(
          getCorpora(testResponse)
        )
        done()
      })
    })
  })
})
