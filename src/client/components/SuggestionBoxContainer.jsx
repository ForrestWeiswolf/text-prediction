import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import SuggestionBox from './SuggestionBox.jsx'

class SuggestionBoxContainer extends Component {
  constructor() {
    super()
    this.state = {
      words: [],
    }
  }

  componentDidMount() {
    axios.get('/api/corpora/testfile').then(res => {
      this.setState({ words: res.data })
    })
  }

  render() {
    const words = this.state.words

    return (
      <div>
        {words.map((word, idx) => (
          <SuggestionBox value={word} key={idx}/>
        ))}
      </div>
    )
  }
}

SuggestionBoxContainer.propTypes = {}

export default SuggestionBoxContainer
