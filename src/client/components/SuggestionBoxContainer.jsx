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

    this.isCancelled = false
  }

  componentDidMount() {
    axios.get('/api/corpora/testfile').then(res => {
      this.isCancelled || this.setState({ words: res.data })
    })
  }

  componentWillUnmount() {
    this.isCancelled = true
  }

  render() {
    const words = this.state.words

    return (
      <div>
        {words.map((word, idx) => (
          <SuggestionBox value={word} key={idx} />
        ))}
      </div>
    )
  }
}

SuggestionBoxContainer.propTypes = {}

export default SuggestionBoxContainer
