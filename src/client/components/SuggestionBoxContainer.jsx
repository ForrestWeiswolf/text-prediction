import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { connect } from 'react-redux'
import SuggestionBox from './SuggestionBox.jsx'

export class SuggestionBoxContainer extends Component {
  constructor(props) {
    super()

    this.state = {
      suggestions: [],
    }

    this.isCancelled = false
    this.fetchWords = this.fetchWords.bind(this)
  }

  componentDidMount() {
    this.fetchWords()
  }

  componentWillReceiveProps(newProps) {
    this.fetchWords()
  }

  componentWillUnmount() {
    this.isCancelled = true
  }

  fetchWords() {
    const wordRoute = this.props.lastWord ? `/${this.props.lastWord}` : ''
    return axios.get('/api/corpora/testfile' + wordRoute).then(res => {
      this.isCancelled || this.setState({ suggestions: res.data })
    })
  }

  render() {
    const suggestions = this.state.suggestions

    return (
      <div>
        {suggestions.map((suggestion, idx) => (
          <SuggestionBox value={suggestion} key={idx} />
        ))}
      </div>
    )
  }
}

SuggestionBoxContainer.propTypes = {
  lastWord: PropTypes.string.isRequired,
}

function mapStateToProps(state) {
  const words = state.text.split(/\W+/)
  return {
    lastWord: words[words.length - 1],
  }
}

function mapDispatch(dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatch
)(SuggestionBoxContainer)
