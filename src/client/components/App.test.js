import React from 'react'
import ReactDOM from 'react-dom'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import App from './App'
import axios from 'axios'

jest.mock('axios')

const testResponse = [{ name: 'foo', route: 'foo' }, { name: 'bar', route: 'bar' }, { name: 'baz', route: 'baz' }]

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


  describe('provider', () => {
    let provider
    let app
    beforeEach(() => {
      render(<App />)
    })

    it('renders a textbox', () => {
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('renders a SuggestionContainer', () => {
      expect(screen.getByTestId('suggestion-container')).toBeInTheDocument();
    })

    // TODO: test that the suggestions change when the textbox is typed in?
  })
})
