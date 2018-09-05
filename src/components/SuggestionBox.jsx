import React from 'react'
import './SuggestionBox.css'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToText } from '../store'

export const SuggestionBox = props => {
  return (
    <div
      className="suggestionBox"
      onClick={() => props.handleClick(props.value)}
    >
      {props.value}
    </div>
  )
}

SuggestionBox.propTypes = {
  value: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
}

function mapStateToProps() {
  return {}
}

function mapDispatch(dispatch) {
  return {
    handleClick: function(toAdd) {
      dispatch(addToText(toAdd))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatch
)(SuggestionBox)
