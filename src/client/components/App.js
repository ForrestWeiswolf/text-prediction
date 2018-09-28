import React, { Component } from 'react'
import './App.css'
import store from '../store'
import { Provider } from 'react-redux'
import TextInput from './TextInput.jsx'
import SuggestionContainer from './SuggestionContainer.jsx'
import Dropdown from './Dropdown.jsx'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <div>
            <TextInput />
            <SuggestionContainer />
            <Dropdown />
          </div>
        </Provider>
      </div>
    )
  }
}

export default App
