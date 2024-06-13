import React from 'react'
import { updateText } from '../store'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './TextInput.css'

export const TextInput = props => {
  return (
    <div>
      <textarea value={props.text} onChange={e => props.handleChange(e.target.value)} />
    </div>
  )
}

TextInput.propTypes = {
  text: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
}


function mapStateToProps(state) {
  return { text: state.text }
}

function mapDispatch(dispatch) {
  return {
    handleChange: function(value) {
      dispatch(updateText(value))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatch
)(TextInput)
