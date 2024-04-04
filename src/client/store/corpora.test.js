import axios from 'axios'
import { selectCorpus, getCorpora, fetchCorpora } from './index'

jest.mock('axios')

describe('selectCorpus', () => {
  it('creates an action with type SELECT_CORPUS', () => {
    expect(selectCorpus('foo').type).toEqual('SELECT_CORPUS')
  })

  it('creates an action with passed argument as corpus prop', () => {
    expect(selectCorpus('foo').corpus).toEqual('foo')
  })
})

describe('getCorpora', () => {
  it('creates an action with type GET_CORPORA', () => {
    expect(getCorpora([{ name: 'Foo', route: 'foo' }]).type).toEqual(
      'GET_CORPORA'
    )
  })

  it('creates an action with passed argument as corpora prop', () => {
    const testCorpus = { name: 'Foo', route: 'foo' }
    expect(getCorpora([testCorpus]).corpora).toEqual([testCorpus])
  })
})

describe('fetchCorpora', () => {
  const testResponse = [
    { name: 'Foo', route: 'foo' },
    { name: 'bar, baz', route: 'bar_baz' },
  ]

  it('returns a function', () => {
    expect(typeof fetchCorpora()).toBe('function')
  })

  describe('returned thunk', () => {
    let thunk
    beforeEach(() => {
      axios.get.mockImplementation(() => Promise.resolve({ status: 200, data: testResponse }))

      thunk = fetchCorpora()
    })

    it('calls /api/corpora', done => {
      thunk(() => { }).then(() => {
        expect(axios.get).toBeCalledWith('/api/corpora/')
        done()
      })
    })

    it('dispatches a GET_CORPORA with the response', done => {
      const dispatchSpy = jest.fn()
      thunk(dispatchSpy).then(() => {
        expect(dispatchSpy).toBeCalledWith(getCorpora(testResponse))
        done()
      })
    })
  })
})
