import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { updateSuggestions, fetchSuggestions } from './index'

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
  const replySpy = jest.fn(config => {
    return [200, testResponse]
  })

  const mock = new MockAdapter(axios)
  mock.onGet('/api/corpus/testfile/').reply(replySpy)

  afterAll(() => {
    mock.restore()
  })

  it('returns a function', () => {
    expect(typeof fetchSuggestions()).toBe('function')
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
      thunk = fetchSuggestions()
    })

    it('gets corpus name from store', done => {
      thunk(() => {}, getStateSpy).then(() => {
        expect(getStateSpy).toBeCalled()
        done()
      })
    })

    it('calls /api/corpus/:corpus', done => {
      thunk(() => {}, getStateSpy).then(() => {
        expect(replySpy).toBeCalled()
        done()
      })
    })

    it('calls /api/corpus/:corpus/:word if fetchSuggestions was passed a word', done => {
      const fooReplySpy = jest.fn(config => {
        return [200, testResponse]
      })

      mock.onGet(/\/api\/corpus\/testfile\/foo\/?/).reply(fooReplySpy)

      thunk = fetchSuggestions('foo')

      thunk(() => {}, getStateSpy).then(() => {
        expect(fooReplySpy).toBeCalled()
        done()
      })
    })

    it('dispatches a UPDATE_SUGGESTIONS with the response', done => {
      const dispatchSpy = jest.fn()
      thunk(dispatchSpy, getStateSpy).then(() => {
        expect(dispatchSpy.lastCall.args[0]).toEqual(
          updateSuggestions(testResponse)
        )
        done()
      })
    })
  })
})
