import React, { Component } from 'react'
import './App.css'
import TextInput from './TextInput.jsx'
import store from '../store'
import { Provider } from 'react-redux'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <TextInput />
        </Provider>
      </div>
    )
  }
}

export default App
