import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import TextInput from './TextInput.jsx'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { Provider } from 'react-redux'
import { SuggestionBoxContainer } from './SuggestionBoxContainer.jsx'

const mock = new MockAdapter(axios)
const testReply = ['foo', 'bar', 'baz']
mock.onGet('/api/corpora/testfile').reply(200, testReply)

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
      provider = app.find(Provider).first()
    })

    it('renders a TextInput', () => {
      expect(provider.find(TextInput)).to.have.lengthOf(1)
    })

    it('renders a SuggestionBoxContainer', () => {
      expect(shallow(<App />).find('SuggestionBoxContainer')).to.have.lengthOf(1)
    })
  })
})
