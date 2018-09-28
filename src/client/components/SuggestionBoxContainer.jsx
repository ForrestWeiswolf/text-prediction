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
    this.props.fetchSuggestions(this.props.lastWord, this.props.selectedCorpus)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.lastWord !== this.props.lastWord || newProps.selectedCorpus !== this.props.selectedCorpus) {
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

SuggestionBoxContainer.propTypes = {
  lastWord: PropTypes.string,
}

function mapStateToProps(state) {
  const words = state.text.split(/\W+/).filter(word => word !== '')
  return {
    lastWord: words[words.length - 1],
    suggestions: state.suggestions,
    selectedCorpus: state.selectedCorpus
  }
}

function mapDispatch(dispatch) {
  return {
    fetchSuggestions: (lastWord, selectedCorpus) => {
      dispatch(fetchSuggestions(lastWord, selectedCorpus))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatch
)(SuggestionBoxContainer)
