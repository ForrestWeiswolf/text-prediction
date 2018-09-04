import React from 'react'
import PropTypes from 'prop-types'

const SuggestionBox = props => {
		return (
			<div className="suggestionBox" onClick={props.handleClick}>
				{props.value}
			</div>
		)
	}

SuggestionBox.propTypes = {
	value: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default SuggestionBox
