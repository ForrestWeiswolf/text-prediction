import { expect } from 'chai'
import axios from 'axios'
import { spy } from 'sinon'
import MockAdapter from 'axios-mock-adapter'
import { updateSuggestions, fetchSuggestions } from './index'

describe('updateSuggestions', () => {
  it('is a function', () => {
    expect(updateSuggestions).to.be.a('function')
  })

  it('creates an action with type UPDATE_SUGGESTIONS', () => {
    expect(updateSuggestions('foo').type).to.equal('UPDATE_SUGGESTIONS')
  })

  it('creates an action with passed argument as suggestions prop', () => {
    expect(updateSuggestions('foo').suggestions).to.equal('foo')
  })
})

describe('fetchSuggestions', () => {
  const testResponse = ['foo', 'bar', 'baz']
  const replySpy = spy(config => {
    return [200, testResponse]
  })

  const mock = new MockAdapter(axios)
  mock.onGet('/api/corpus/testfile/').reply(replySpy)

  afterAll(() => {
    mock.restore()
  })

  it('is a function', () => {
    expect(fetchSuggestions).to.be.a('function')
  })

  it('returns a function', () => {
    expect(fetchSuggestions([])).to.be.a('function')
  })

  describe('returned thunk', () => {
    let thunk
    let getStateSpy
    beforeEach(() => {
      getStateSpy = spy(() => {
        return {
          selectedCorpus: 'testfile',
        }
      })
      thunk = fetchSuggestions([])
    })

    it('gets corpus name from store', done => {
      thunk(() => { }, getStateSpy).then(() => {
        expect(getStateSpy.called).to.be.true
        done()
      })
    })

    it('calls /api/corpus/:corpus', done => {
      thunk(() => { }, getStateSpy).then(() => {
        expect(replySpy.called).to.be.true
        done()
      })
    })

    it('calls /api/corpus/:corpus/?words=["word"] if fetchSuggestions was passed a word', done => {
      const fooReplySpy = spy(config => {
        return [200, testResponse]
      })

      mock.onGet('/api/corpus/testfile?words=["foo"]').reply(fooReplySpy)

      thunk = fetchSuggestions(['foo'])

      thunk(() => { }, getStateSpy).then(() => {
        expect(fooReplySpy.called).to.be.true
        done()
      })
    })

    describe('if fetchSuggestions was passed multiple words', () => {
      it('calls /api/corpus/:corpus/ with multiple word in query', done => {
        const replySpy = spy(config => {
          return [200, testResponse]
        })

        mock.onGet('/api/corpus/testfile?words=["foo","bar"]').reply(replySpy)

        thunk = fetchSuggestions(['foo', 'bar'])

        thunk(() => { }, getStateSpy).then(() => {
          expect(fooReplySpy.called).to.be.true
          done()
        })
      })
    })

    it('dispatches a UPDATE_SUGGESTIONS with the response', done => {
      const dispatchSpy = spy()
      thunk(dispatchSpy, getStateSpy).then(() => {
        expect(dispatchSpy.lastCall.args[0]).to.deep.equal(
          updateSuggestions(testResponse)
        )
        done()
      })
    })
  })
})
