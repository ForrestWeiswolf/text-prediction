import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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

function mapStateToProps(state) {
  return { corpora: state.corpora }
}

function mapDispatch(dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatch
)(Dropdown)
