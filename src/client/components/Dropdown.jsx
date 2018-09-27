import React from 'react'
import PropTypes from 'prop-types'

const Dropdown = props => {
  return (
    <div>
      <select>
        {props.corpora.map((corpusName) => {
          return <option value={corpusName} key={corpusName}>{corpusName}</option>
        })}
      </select>
    </div>
  )
}

Dropdown.propTypes = {
  corpora: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Dropdown
