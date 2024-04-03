import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import TextInput from './TextInput.jsx'
import { shallow, mount } from 'enzyme'

import axios from 'axios'
import { Provider } from 'react-redux'
import SuggestionContainer from './SuggestionContainer.jsx'

jest.mock('axios')

const testResponse = ['foo', 'bar', 'baz']

describe('App', () => {
  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      if (/\/api(\/w+)*/.test(url)) {
        return Promise.resolve({ status: 200, data: testResponse })
      } else {
        return Promise.reject({ status: 404 })
      }
    })
  })

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('renders a Provider', () => {
    expect(shallow(<App />).find('Provider')).toHaveLength(1)
  })

  describe('provider', () => {
    let provider
    let app
    beforeEach(() => {
      app = mount(<App />)
      provider = app.find(Provider).first()
    })

    it('renders a TextInput', () => {
      expect(provider.find(TextInput)).toHaveLength(1)
    })

    it('renders a SuggestionContainer', () => {
      expect(shallow(<App />).find(SuggestionContainer)).toHaveLength(1)
    })
  })
})
