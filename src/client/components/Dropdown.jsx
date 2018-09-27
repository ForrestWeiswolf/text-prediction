import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchCorpora } from '../store/index.js'

export class Dropdown extends Component {
	componentWillMount(){
		this.props.fetchCorpora()
	}

  render() {
    return (
      <div>
        <select>
          {this.props.corpora.map(corpusName => {
            return (
              <option value={corpusName} key={corpusName}>
                {corpusName}
              </option>
            )
          })}
        </select>
      </div>
    )
  }
}

Dropdown.propTypes = {
  corpora: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchCorpora: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return { corpora: state.corpora }
}

function mapDispatch(dispatch) {
  return {
    fetchCorpora: () => dispatch(fetchCorpora()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatch
)(Dropdown)
