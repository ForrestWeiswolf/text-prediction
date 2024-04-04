import React from 'react'
import { shallow } from 'enzyme'
import { TextInput } from './TextInput.jsx'

describe('TextInput', () => {
  let textInput
  let changeSpy
  beforeEach(() => {
    changeSpy = jest.fn()
    textInput = shallow(<TextInput text={'foo'} handleChange={changeSpy} />)
  })

  it('has a textarea', () => {
    expect(textInput.find('textarea')).toHaveLength(1)
  })

  it('the value of the text input is the component\'s "text" prop', () => {
    textInput = shallow(<TextInput text={'foo'} handleChange={changeSpy} />)

    expect(textInput.find('textarea[value="foo"]').length).toEqual(1)
  })

  describe('when user types in the text input', () => {
    it('calls handleChange with an event containing the entered text', () => {
      const evt = { value: 'foo' }
      textInput
        .find('textarea')
        .first()
        .simulate('change', evt)

      expect(changeSpy).toBeCalledWith(evt)
    })
  })
})
