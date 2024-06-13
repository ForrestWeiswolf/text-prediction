import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { TextInput } from './TextInput.jsx'

describe('TextInput', () => {
  let textInput
  let changeSpy
  beforeEach(() => {
    changeSpy = jest.fn()
    render(<TextInput text={'foo'} handleChange={changeSpy} />)
  })

  it('has a textarea', () => {
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('the value of the text input is the component\'s "text" prop', () => {
    expect(screen.getByRole('textbox')).toHaveValue('foo')
  })

  describe('when user types in the text input', () => {
    it('calls handleChange with an event containing the entered text', async () => {
      const textArea = screen.getByRole('textbox')
      await fireEvent.change(textArea, { target: { value: 'bar' } })

      expect(changeSpy).toHaveBeenCalledWith('bar')
    })
  })
})
