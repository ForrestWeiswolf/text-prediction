import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import TextInput from './TextInput.jsx'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import { Provider } from 'react-redux'

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('renders a Provider', () => {
    expect(shallow(<App />).find('Provider')).to.have.lengthOf(1)
  })

  describe('provider', () => {
    let provider
    let app
    beforeEach(() => {
      app = mount(<App />)
      provider = app.find('Provider').first()
    })

    it('renders a TextInput', () => {
      expect(provider.find(TextInput)).to.have.lengthOf(1)
    })
  })
})
