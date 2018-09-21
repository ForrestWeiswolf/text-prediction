import { expect } from 'chai'
import axios from 'axios'
import { spy } from 'sinon'
import MockAdapter from 'axios-mock-adapter'
import {
  updateText,
  addToText,
  updateSuggestions,
  fetchSuggestions,
} from './index'

describe('updateText', () => {
  it('is a function', () => {
    expect(updateText).to.be.a('function')
  })

  it('creates an action with type UPDATE_TEXT', () => {
    expect(updateText('foo').type).to.equal('UPDATE_TEXT')
  })

  it('creates an action with passed argument as newText prop', () => {
    expect(updateText('foo').newText).to.equal('foo')
  })
})

describe('addToText', () => {
  it('is a function', () => {
    expect(addToText).to.be.a('function')
  })

  it('creates an action with type ADD_TO_TEXT', () => {
    expect(addToText('foo').type).to.equal('ADD_TO_TEXT')
  })

  it('creates an action with passed argument as newText prop', () => {
    expect(addToText('foo').newText).to.equal('foo')
  })
})

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

// it('calls to /api/corpora/testfile with its lastWord prop', done => {
//   const replySpy = spy(config => [200, testReply])

//   mock.onGet(/api\/corpora\/testfile\/foo\/?/).reply(replySpy)

//   suggestionBoxContainer = shallow(<SuggestionBoxContainer lastWord="foo" />)

//   setImmediate(() => {
//     expect(replySpy.called).to.be.true
//     done()
//   })
// })

describe('fetchSuggestions', () => {
  const mock = new MockAdapter(axios)
  const testResponse = ['foo', 'bar', 'baz']
  const replySpy = spy(config => {
    return [200, testResponse]
  })

  mock.onGet(/api\/corpora\/testfile\/?$/).reply(replySpy)

  afterAll(() => {
    mock.restore()
  })

  it('is a function', () => {
    expect(fetchSuggestions).to.be.a('function')
  })

  it('returns a function', () => {
    expect(fetchSuggestions()).to.be.a('function')
  })

  describe('returned thunk', () => {
    let thunk
    beforeEach(() => {
      thunk = fetchSuggestions()
    })

    it('calls /api/corpora/testfile', done => {
      thunk(() => {}).then(() => {
        expect(replySpy.called).to.be.true
        done()
      })
    })

    it('calls dispatch on the response', done => {
      const dispatchSpy = spy()
      thunk(dispatchSpy).then(() => {
        expect(dispatchSpy.lastCall.args[0]).to.deep.equal(testResponse)
        done()
      })
    })
  })
})
