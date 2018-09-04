import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import SuggestionBox from './SuggestionBox.jsx'

describe('SuggestionBox', () => {
  let suggestionBox
  let clickSpy
  beforeEach(() => {
    clickSpy = spy()
    suggestionBox = shallow(<SuggestionBox value="foo" handleClick={clickSpy} />)
  })

	it('renders a div with class "suggestionBox"', () => {
		expect(suggestionBox.find('div.suggestionBox').length).to.equal(1)
	})

  it('renders a div with the text from it\'s "value" prop', () => {
		expect(suggestionBox.find('div.suggestionBox').text()).to.equal('foo')
	})

  describe('when clicked', () => {
    it('calls handleClick function passed as prop with value', () => {
			suggestionBox.simulate('click')
			expect(clickSpy.calledWith('foo'))
		})
  })
})
