import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { selectCorpus, getCorpora, fetchCorpora } from './index'

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

  const replySpy = jest.fn(config => {
    return [200, testResponse]
  })

  const mock = new MockAdapter(axios)
  mock.onGet('/api/corpora/').reply(replySpy)

  afterAll(() => {
    mock.restore()
  })

  it('returns a function', () => {
    expect(typeof fetchCorpora()).toBe('function')
  })

  describe('returned thunk', () => {
    let thunk
    beforeEach(() => {
      thunk = fetchCorpora()
    })

    it('calls /api/corpora', done => {
      thunk(() => {}).then(() => {
        expect(replySpy).toBeCalled()
        done()
      })
    })

    it('dispatches a GET_CORPORA with the response', done => {
      const dispatchSpy = jest.fn()
      thunk(dispatchSpy).then(() => {
        expect(dispatchSpy.lastCall.args[0]).toEqual(
          getCorpora(testResponse)
        )
        done()
      })
    })
  })
})
