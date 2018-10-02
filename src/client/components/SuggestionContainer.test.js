import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import SuggestionBox from './SuggestionBox.jsx'
import lodash from 'lodash'
import { spy, stub } from 'sinon'
import { fetchSuggestions } from '../store'
import {
  SuggestionContainer,
  mapState,
  mapDispatch,
} from './SuggestionContainer.jsx'

describe('SuggestionContainer', () => {
  let suggestionContainer
  let fetchSpy
  const testSuggestions = ['foo', 'bar', 'baz']

  beforeEach(() => {
    fetchSpy = spy(() => {})

    suggestionContainer = shallow(
      <SuggestionContainer
        lastWord=""
        selectedCorpus="foo"
        suggestions={testSuggestions}
        fetchSuggestions={fetchSpy}
      />
    )
  })

  it('Renders three SuggestionBox-es', () => {
    expect(suggestionContainer.find(SuggestionBox).length).to.equal(3)
  })

  it('passes them the values from suggestions prop', () => {
    const boxes = suggestionContainer.find(SuggestionBox)

    testSuggestions.forEach((word, idx) => {
      expect(boxes.at(idx).props().value).to.equal(word)
    })
  })

  it('fetches suggestions when rendered', () => {
    expect(fetchSpy.called).to.be.true
  })

  it('fetches suggestions based on lastWord and selectedCorpus', () => {
    suggestionContainer = shallow(
      <SuggestionContainer
        lastWord="foo"
        selectedCorpus="bar"
        suggestions={testSuggestions}
        fetchSuggestions={fetchSpy}
      />
    )

    expect(fetchSpy.calledWith('foo', 'bar')).to.be.true
  })

  it('fetches suggestions based on new lastWord and selectedCorpus when componentWillReceiveProps', () => {
    suggestionContainer.setProps({
      lastWord: 'foo',
      selectedCorpus: 'bar',
      suggestions: testSuggestions,
      fetchSuggestions: fetchSpy,
    })

    expect(fetchSpy.calledWith('foo', 'bar')).to.be.true
  })

  it("doesn't fetch suggestions when neither lastWord not selectedCorpus is changed", () => {
    suggestionContainer.setProps({
      lastWord: 'foo',
      selectedCorpus: 'bar',
      suggestions: testSuggestions,
      fetchSuggestions: fetchSpy,
    })

    fetchSpy.resetHistory()

    suggestionContainer.setProps({
      lastWord: 'foo',
      selectedCorpus: 'bar',
      suggestions: [],
      fetchSuggestions: fetchSpy,
    })

    expect(fetchSpy.called).to.be.false
  })

  it("doesn't fetch suggestions when selectedCorpus is falsey", () => {
    fetchSpy.resetHistory()

    suggestionContainer.setProps({
      lastWord: 'foo',
      selectedCorpus: null,
      suggestions: [],
      fetchSuggestions: fetchSpy,
    })

    expect(fetchSpy.called).to.be.false
  })
})

describe('mapState', () => {
  const testState = {
    text: 'Lorem ipusm dolor sit amet',
    suggestions: ['consectetur'],
    selectedCorpus: 'lorem_ipsum',
    corpora: ['lorem_ipsum'],
  }

  it('returns an object', () => {
    expect(mapState(testState)).to.be.an('object')
  })

  it('has suggestions from state', () => {
    expect(mapState(testState).suggestions).to.deep.equal(testState.suggestions)
  })

  it('has selectedCorpus from state', () => {
    expect(mapState(testState).selectedCorpus).to.deep.equal(
      testState.selectedCorpus
    )
  })

  it('has last word of text from state as lastWord prop', () => {
    expect(mapState(testState).lastWord).to.deep.equal('amet')
  })
})

describe('mapDispatch', () => {
  let dispatchSpy = spy()
  const debounceStub = stub(lodash, 'debounce')
  debounceStub.returnsArg(0)
  debounceStub.isAStub = true

  afterEach(() => {
    debounceStub.resetHistory()
  })

  it('returns an object', () => {
    expect(mapDispatch(dispatchSpy)).to.be.an('object')
  })

  it('has a fetchSuggestions method', () => {
    expect(mapDispatch(dispatchSpy).fetchSuggestions).to.be.a('function')
  })

  describe('fetchSuggestions method', () => {
    it('dispatches a fetchSuggestions action with its args', () => {
      mapDispatch(dispatchSpy).fetchSuggestions('foo', 'bar')
      expect(dispatchSpy.called).to.be.true
    })

    it('is debounced to 200ms', () => {
      mapDispatch(dispatchSpy)
      expect(debounceStub.called).to.be.true
    })
  })
})
