import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import SuggestionBox from './SuggestionBox.jsx'
import { spy } from 'sinon'
import { fetchSuggestions } from '../store'
import { SuggestionBoxContainer } from './SuggestionBoxContainer.jsx'

describe('SuggestionBoxContainer', () => {
  let suggestionBoxContainer
  let fetchSpy
  const testSuggestions = ['foo', 'bar', 'baz']

  beforeEach(() => {
    fetchSpy = spy(() => {})

    suggestionBoxContainer = shallow(
      <SuggestionBoxContainer
        lastWord=""
        suggestions={testSuggestions}
        fetchSuggestions={fetchSpy}
      />
    )
  })

  it('Renders three SuggestionBox-es', () => {
    expect(suggestionBoxContainer.find(SuggestionBox).length).to.equal(3)
  })

  it('passes them the values from suggestions prop', () => {
    const boxes = suggestionBoxContainer.find(SuggestionBox)

    testSuggestions.forEach((word, idx) => {
      expect(boxes.at(idx).props().value).to.equal(word)
    })
  })

  it('fetches suggestions when rendered', () => {
    expect(fetchSpy.called).to.be.true
  })

  it('fetches suggestions based on lastWord', () => {
    suggestionBoxContainer = shallow(
      <SuggestionBoxContainer
        lastWord="foo"
        suggestions={testSuggestions}
        fetchSuggestions={fetchSpy}
      />
    )

    expect(fetchSpy.calledWith('foo')).to.be.true
  })

  it('fetches suggestions based on new lastWord when componentWillReceiveProps', () => {
    suggestionBoxContainer.setProps({
      lastWord: 'foo',
      suggestions: testSuggestions,
      fetchSuggestions: fetchSpy,
    })

    expect(fetchSpy.calledWith('foo')).to.be.true
  })

  it('doesn\'t fetch suggestions when lastWord isn\'t changed', () => {
    suggestionBoxContainer.setProps({
      lastWord: 'foo',
      suggestions: testSuggestions,
      fetchSuggestions: fetchSpy,
    })

    fetchSpy.resetHistory()

    suggestionBoxContainer.setProps({
      lastWord: 'foo',
      suggestions: [],
      fetchSuggestions: fetchSpy,
    })

    expect(fetchSpy.called).to.be.false
  })
})
