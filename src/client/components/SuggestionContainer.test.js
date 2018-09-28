import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import SuggestionBox from './SuggestionBox.jsx'
import { spy } from 'sinon'
import { fetchSuggestions } from '../store'
import { SuggestionContainer } from './SuggestionContainer.jsx'

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
