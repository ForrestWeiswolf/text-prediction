import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { shallow } from 'enzyme'
import { expect } from 'chai'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders a TextInput', () => {
  expect(shallow(<App />).find('TextInput')).to.have.lengthOf(1)
})
