import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchCorpora, selectCorpus } from '../store/index.js'
import './Dropdown.css'

export const Dropdown = (props) => {
  useEffect(() => {
    props.fetchCorpora()
  }, [])

  return (
    <div className="dropdown">
      <select onChange={(e) => { props.handleChange(e.target.value) }}>
        {props.corpora.map((corpus, idx) => {
          return (
            <option value={corpus.route} key={idx}>
              {corpus.name}
            </option>
          )
        })}
      </select>
    </div>
  )
}

Dropdown.propTypes = {
  corpora: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchCorpora: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return { corpora: state.corpora }
}

function mapDispatch(dispatch) {
  return {
    fetchCorpora: () => dispatch(fetchCorpora()),
    handleChange: val => dispatch(selectCorpus(val))
  }
}

export default connect(
  mapStateToProps,
  mapDispatch
)(Dropdown)
