import React from 'react'
import PropTypes from 'prop-types'
import SuggestionBox from './SuggestionBox.jsx'

const SuggestionBoxContainer = props => {
		return (
			<div>
				<SuggestionBox />
				<SuggestionBox />
				<SuggestionBox />
			</div>
		)
	}

SuggestionBoxContainer.propTypes = {
}

export default SuggestionBoxContainer
