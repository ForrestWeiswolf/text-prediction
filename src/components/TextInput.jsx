import React from 'react'
import { updateText } from '../store'
import { connect } from 'react-redux'

const TextInput = props => {
  return (
    <div>
      <input
        type="text"
        value={props.text}
        onChange={props.handleChange}
      />
    </div>
  )
}

function mapStateToProps(state) {
  return { text: state.text }
}

function mapDispatch(dispatch) {
  return {
		handleChange: function(e){
			dispatch(updateText(e.target.value))
		}
	}
}

export default connect(
  mapStateToProps,
  mapDispatch
)(TextInput)
