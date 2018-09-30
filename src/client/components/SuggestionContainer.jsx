import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SuggestionBox from './SuggestionBox.jsx'
import { fetchSuggestions } from '../store/index.js'

export class SuggestionContainer extends Component {
  constructor(props) {
    super()
  }

  componentDidMount() {
    if (this.props.selectedCorpus) {
      this.props.fetchSuggestions(
        this.props.lastWord,
        this.props.selectedCorpus
      )
    }
  }

  componentWillReceiveProps(newProps) {
    const changedWord = newProps.lastWord !== this.props.lastWord
    const changedCorpus = newProps.selectedCorpus !== this.props.selectedCorpus

    if (newProps.selectedCorpus && (changedWord || changedCorpus)) {
      this.props.fetchSuggestions(newProps.lastWord, newProps.selectedCorpus)
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

SuggestionContainer.propTypes = {
  lastWord: PropTypes.string,
}

export function mapState(state) {
  const words = state.text.split(/\W+/).filter(word => word !== '')
  return {
    lastWord: words[words.length - 1],
    suggestions: state.suggestions,
    selectedCorpus: state.selectedCorpus,
  }
}

export function mapDispatch(dispatch) {
  return {
    fetchSuggestions: (lastWord, selectedCorpus) => {
      dispatch(fetchSuggestions(lastWord, selectedCorpus))
    },
  }
}

export default connect(
  mapState,
  mapDispatch
)(SuggestionContainer)
