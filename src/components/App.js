import React, { Component } from 'react'
import './App.css'
import store from '../store'
import { Provider } from 'react-redux'
import TextInput from './TextInput.jsx'

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
