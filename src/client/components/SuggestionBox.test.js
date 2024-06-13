import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { SuggestionBox } from './SuggestionBox.jsx'

describe('SuggestionBox', () => {
  let clickSpy
  beforeEach(() => {
    clickSpy = jest.fn()
    render(<SuggestionBox value="foo" handleClick={clickSpy} />)
  })


  it('renders a div with the text from it\'s "value" prop', () => {
    expect(screen.getByText('foo')).toBeInTheDocument()
  })

  describe('when clicked', () => {
    it('calls handleClick function passed as prop with value', () => {
      const suggestionBox = screen.getByText('foo')
      fireEvent.click(suggestionBox)
      expect(clickSpy).toBeCalledWith('foo')
    })
  })
})
