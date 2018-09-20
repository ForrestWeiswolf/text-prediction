import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import SuggestionBox from './SuggestionBox.jsx'
import { SuggestionBoxContainer } from './SuggestionBoxContainer.jsx'
import axios from 'axios'
import { spy } from 'sinon'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(axios)
const testReply = ['foo', 'bar', 'baz']

mock.onGet(/api\/corpora\/testfile\/?$/).reply(200, testReply)

describe('SuggestionBoxContainer', () => {
  let suggestionBoxContainer
  beforeEach(() => {
    suggestionBoxContainer = shallow(<SuggestionBoxContainer lastWord="" />)
  })

  afterAll(() => {
    mock.restore()
  })

  it('Renders three SuggestionBox-es', () => {
    expect(suggestionBoxContainer.find(SuggestionBox).length).to.equal(3)
  })

  it('passes them the values from a call to /api/corpora/testfile', () => {
    const boxes = suggestionBoxContainer.find(SuggestionBox)

    testReply.forEach((word, idx) => {
      expect(boxes.at(idx).props().value).to.equal(word)
    })
  })

  it('calls to /api/corpora/testfile with its lastWord prop', done => {
    const replySpy = spy(config => [200, testReply])

    mock.onGet(/api\/corpora\/testfile\/foo\/?/).reply(replySpy)

    suggestionBoxContainer = shallow(<SuggestionBoxContainer lastWord="foo" />)

    setImmediate(() => {
      expect(replySpy.called).to.be.true
      done()
    })
  })
})
