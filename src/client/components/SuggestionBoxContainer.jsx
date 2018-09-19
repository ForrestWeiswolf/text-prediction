import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { connect } from 'react-redux'
import SuggestionBox from './SuggestionBox.jsx'

export class SuggestionBoxContainer extends Component {
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
