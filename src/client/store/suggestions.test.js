import axios from 'axios'
import { updateSuggestions, fetchSuggestions } from './index'

jest.mock('axios')

describe('updateSuggestions', () => {
  it('creates an action with type UPDATE_SUGGESTIONS', () => {
    expect(updateSuggestions('foo').type).toEqual('UPDATE_SUGGESTIONS')
  })

  it('creates an action with passed argument as suggestions prop', () => {
    expect(updateSuggestions('foo').suggestions).toEqual('foo')
  })
})

describe('fetchSuggestions', () => {
  const testResponse = ['foo', 'bar', 'baz']

  it('returns a function', () => {
    expect(typeof fetchSuggestions([])).toBe('function')
  })

  describe('returned thunk', () => {
    let thunk
    let getStateSpy
    beforeEach(() => {
      getStateSpy = jest.fn(() => {
        return {
          selectedCorpus: 'testfile',
        }
      })

      axios.get.mockImplementation(() => Promise.resolve({ status: 200, data: testResponse }))

      thunk = fetchSuggestions([])
    })

    it('calls /api/corpus/:corpus, with the corpus name from store', done => {
      thunk(() => { }, getStateSpy).then(() => {
        expect(axios.get).toBeCalledWith('/api/corpus/testfile?words=[]')
      })
      done()
    })

    it('calls /api/corpus/:corpus?words=["word"] if fetchSuggestions was passed a word', done => {
      thunk = fetchSuggestions(['foo'])

      thunk(() => { }, getStateSpy).then(() => {
        expect(axios.get).toBeCalledWith('/api/corpus/testfile?words=["foo"]')
      })
      done()
    })

    describe('if fetchSuggestions was passed multiple words', () => {
      it('calls /api/corpus/:corpus/ with multiple word in query', done => {
        axios.mockImplementation((url) => ({status: 200, data: testResponse}))

        thunk = fetchSuggestions(['foo', 'bar'])

        thunk(() => { }, getStateSpy).then(() => {
          expect(axios.get).toBeCalledWith('/api/corpus/testfile?words=["foo","bar"]')
          done()
        })
      })
    })

    it('dispatches a UPDATE_SUGGESTIONS with the response', done => {
      const dispatchSpy = jest.fn()

      thunk(dispatchSpy, getStateSpy).then(() => {
        expect(dispatchSpy).toBeCalledWith(updateSuggestions(testResponse))
        done()
      })
    })
  })
})
