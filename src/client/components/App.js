import React, { Component } from 'react'
import './App.css'
import store from '../store'
import { Provider } from 'react-redux'
import TextInput from './TextInput.jsx'
import SuggestionBox from './SuggestionBox.jsx'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <div>
            <TextInput />
            <SuggestionBox value="foo" />
          </div>
        </Provider>
      </div>
    )
  }
}

export default App
