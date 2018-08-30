import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import TextInput from './TextInput.jsx'

describe('TextInput', () => {
  let textInput
  beforeEach(() => {
    textInput = shallow(<TextInput />)
  })

  it('has a text input', () => {
    expect(textInput.find('input[type="text"]')).to.have.lengthOf(1)
  })
})
