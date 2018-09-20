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

function mapStateToProps() {
  return {}
}

function mapDispatch(dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatch
)(SuggestionBoxContainer)
