import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { debounce, isEqual } from 'lodash'
import SuggestionBox from './SuggestionBox.jsx'
import { fetchSuggestions } from '../store/index.js'

export class SuggestionContainer extends Component {
  constructor(props) {
    super()
  }

  componentDidMount() {
    if (this.props.selectedCorpus) {
      this.props.fetchSuggestions(this.props.lastWords)
    }
  }

  componentDidUpdate(prevProps) {
    const changedWords = !isEqual(prevProps.lastWords, this.props.lastWords)
    const changedCorpus = prevProps.selectedCorpus !== this.props.selectedCorpus

    if (this.props.selectedCorpus && (changedWords || changedCorpus)) {
      this.props.fetchSuggestions(this.props.lastWords)
    }
  }

  render() {
    const suggestions = this.props.suggestions

    return (
      <div>
        {!suggestions.map && console.log(suggestions)}
        {suggestions && suggestions.map((suggestion, idx) => (
          <SuggestionBox value={suggestion} key={idx} />
        ))}
      </div>
    )
  }
}

SuggestionContainer.propTypes = {
  lastWords: PropTypes.arrayOf(PropTypes.string),
}

export function mapState(state) {
  const words = state.text.split(/\W+/).filter(word => word !== '')
  return {
    lastWords: words.slice(Math.max(0, words.length - 2)),
    suggestions: state.suggestions,
    selectedCorpus: state.selectedCorpus,
  }
}

export function mapDispatch(dispatch) {
  const debouncedDispatch = debounce(dispatch, 200)

  return {
    fetchSuggestions: (lastWords, selectedCorpus) => {
      console.log(lastWords)
      debouncedDispatch(fetchSuggestions(lastWords))
    },
  }
}

export default connect(
  mapState,
  mapDispatch
)(SuggestionContainer)
