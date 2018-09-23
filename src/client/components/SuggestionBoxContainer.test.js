import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import SuggestionBox from './SuggestionBox.jsx'
import { SuggestionBoxContainer } from './SuggestionBoxContainer.jsx'

describe('SuggestionBoxContainer', () => {
  let suggestionBoxContainer
  const testSuggestions = ['foo', 'bar', 'baz']
  beforeEach(() => {
    suggestionBoxContainer = shallow(
      <SuggestionBoxContainer lastWord="" suggestions={testSuggestions} />
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
})
