import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SuggestionBox from './SuggestionBox.jsx'
import { fetchSuggestions } from '../store/index.js'

export class SuggestionBoxContainer extends Component {
  constructor(props) {
    super()
  }

  componentDidMount() {
    this.props.fetchSuggestions(this.props.lastWord)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.lastWord !== this.props.lastWord) {
      this.props.fetchSuggestions(newProps.lastWord)
    }
  }

  render() {
    const suggestions = this.props.suggestions

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
    suggestions: state.suggestions,
  }
}

function mapDispatch(dispatch) {
  return {
    fetchSuggestions: lastWord => {
      dispatch(fetchSuggestions(lastWord))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatch
)(SuggestionBoxContainer)
