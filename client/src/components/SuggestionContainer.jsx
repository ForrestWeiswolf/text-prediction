import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { debounce } from 'lodash'
import SuggestionBox from './SuggestionBox.jsx'
import { fetchSuggestions } from '../store/index.js'

const DEPTH = 2

export const SuggestionContainer = (props) => {
  useEffect(() => {
    if (props.selectedCorpus) {
      props.fetchSuggestions(props.lastWords)
    }
  }, [props.selectedCorpus, JSON.stringify(props.lastWords)])


  return (
    <div data-testid="suggestion-container">
      {!props.suggestions.map && console.log(props.suggestions)}
      {props.suggestions && props.suggestions.map((suggestion, idx) => (
        <SuggestionBox value={suggestion} key={idx} />
      ))}
    </div>
  )
}

SuggestionContainer.propTypes = {
  lastWords: PropTypes.arrayOf(PropTypes.string),
}

export function mapState(state) {
  const words = state.text.split(/\W+/).filter(word => word !== '')
  return {
    lastWords: words.slice(Math.max(0, words.length - DEPTH)),
    suggestions: state.suggestions,
    selectedCorpus: state.selectedCorpus,
  }
}

export function mapDispatch(dispatch) {
  const debouncedDispatch = debounce(dispatch, 200)

  return {
    fetchSuggestions: (lastWords, selectedCorpus) => {
      debouncedDispatch(fetchSuggestions(lastWords))
    },
  }
}

export default connect(
  mapState,
  mapDispatch
)(SuggestionContainer)
