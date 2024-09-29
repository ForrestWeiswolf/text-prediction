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
            <footer>
              <small>
                <details>
                  <summary>What is this?</summary>
                  <p>You can pick a source text, and then type in the text box, and it'll suggest three words that would be likely to come next after the last two words you've typed, in the book that you picked.</p>
                  <p>The code can be found <a href="https://github.com/ForrestWeiswolf/text-prediction">here</a>, and the website of the person who made it can be found <a href='https://forrestweiswolf.github.io'>here</a>.</p>
                </details>
              </small>
            </footer>
          </div>
        </Provider>
      </div>
    )
  }
}

export default App
