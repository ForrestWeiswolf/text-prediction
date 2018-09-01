import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import { TextInput } from './TextInput.jsx'

describe('TextInput', () => {
  let textInput
  let changeSpy
  beforeEach(() => {
    changeSpy = spy()
    textInput = shallow(<TextInput text={'foo'} handleChange={changeSpy} />)
  })

  it('has a text input', () => {
    expect(textInput.find('input[type="text"]')).to.have.lengthOf(1)
  })

  it('the value of the text input is the component\'s "text" prop', () => {
    textInput = shallow(<TextInput text={'foo'} handleChange={changeSpy} />)

    expect(textInput.find('input[type="text"][value="foo"]').length).to.equal(1)
  })

  describe('when user types in the text input', () => {
    it('calls handleChange with an event containing the entered text', () => {
      const evt = { value: 'foo' }
      textInput
        .find('input[type="text"]')
        .first()
        .simulate('change', evt)

      expect(changeSpy.getCall(0).args[0]).to.equal(evt)
    })
  })
})
