import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import SuggestionBox from './SuggestionBox.jsx'
import SuggestionBoxContainer from './SuggestionBoxContainer.jsx'

describe('SuggestionBoxContainer', () => {
  let suggestionBoxContainer
  beforeEach(() => {
    suggestionBoxContainer = shallow(<SuggestionBoxContainer />)
  })

  it('Renders three SuggestionBox-es', () => {
    expect(suggestionBoxContainer.find(SuggestionBox).length).to.equal(3)
  })
})
