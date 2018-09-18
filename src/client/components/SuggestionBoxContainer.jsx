import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import SuggestionBox from './SuggestionBox.jsx'

class SuggestionBoxContainer extends Component {
  render() {
    return <div>
      <SuggestionBox />
      <SuggestionBox />
      <SuggestionBox />
    </div>
  }
}

SuggestionBoxContainer.propTypes = {}

export default SuggestionBoxContainer
