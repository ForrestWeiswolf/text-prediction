import { expect } from 'chai'
import axios from 'axios'
import { spy } from 'sinon'
import MockAdapter from 'axios-mock-adapter'
import {
  updateText,
  addToText,
  updateSuggestions,
  fetchSuggestions,
  switchCorpus,
  getCorpora,
  fetchCorpora,
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

describe('fetchSuggestions', () => {

// Due to some kind of issue with axios-mock-adaptor, these tests fail unless
// the tests for fetchCorpora are commented out, and vice-versa.
// If run separately, both pass, but they can't be run at the same time 
// until I find a fix for this.


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
    expect(fetchSuggestions()).to.be.a('function')
  })

  describe('returned thunk', () => {
    let thunk
    let getStateSpy
    beforeEach(() => {
      getStateSpy = spy(() => {
        return {
          corpus: 'testfile',
        }
      })
      thunk = fetchSuggestions()
    })

    it('gets corpus name from store', done => {
      thunk(() => {}, getStateSpy).then(() => {
        expect(getStateSpy.called).to.be.true
        done()
      })
    })

    it('calls /api/corpus/:corpus', done => {
      thunk(() => {}, getStateSpy).then(() => {
        expect(replySpy.called).to.be.true
        done()
      })
    })

    it('calls /api/corpus/:corpus/:word if fetchSuggestions was passed a word', done => {
      const fooReplySpy = spy(config => {
        return [200, testResponse]
      })

      mock.onGet('/api/corpus/testfile/foo/').reply(fooReplySpy)

      thunk = fetchSuggestions('foo')

      thunk(() => {}, getStateSpy).then(() => {
        expect(fooReplySpy.called).to.be.true
        done()
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

describe('fetchCorpora', () => {

// Due to some kind of issue with axios-mock-adaptor, these tests fail unless
// the tests for fetchSuggestions are commented out, and vice-versa.
// If run separately, both pass, but they can't be run at the same time 
// until I find a fix for this.

  // const testResponse = ['foo', 'bar', 'baz']
  // const replySpy = spy(config => {
  //   console.log(config)
  //   return [200, testResponse]
  // })

  // const mock = new MockAdapter(axios)
  // mock.onGet('/api/corpora/').reply(replySpy)

  // afterAll(() => {
  //   mock.restore()
  // })

  // it('is a function', () => {
  //   expect(fetchCorpora).to.be.a('function')
  // })

  // it('returns a function', () => {
  //   expect(fetchCorpora()).to.be.a('function')
  // })

  // describe('returned thunk', () => {
  //   let thunk

  //   beforeEach(() => {
  //     thunk = fetchCorpora()
  //   })

  //   it('calls /api/corpora', done => {
  //     thunk(() => {}).then(() => {
  //       expect(replySpy.called).to.be.true
  //       done()
  //     })
  //   })

    // it('dispatches a GET_CORPORA with the response', done => {
    //   const dispatchSpy = spy()
      
    //   thunk(dispatchSpy).then(() => {
    //     expect(dispatchSpy.lastCall.args[0]).to.deep.equal(
    //       getCorpora(testResponse)
    //     )
    //     done()
    //   })
    // })
  })
})
