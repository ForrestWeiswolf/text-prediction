import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import axios from 'axios'

const initialState = {
  text: '',
}

const UPDATE_TEXT = 'UPDATE_TEXT'
const ADD_TO_TEXT = 'ADD_TO_TEXT'
const FETCH_SUGGESTIONS = 'FETCH_SUGGESTIONS'
const UPDATE_SUGGESTIONS = 'UPDATE_SUGGESTIONS'

export function updateText(newText) {
  return { type: UPDATE_TEXT, newText }
}

export function addToText(newText) {
  return { type: ADD_TO_TEXT, newText }
}

export function updateSuggestions(suggestions) {
  return { type: UPDATE_SUGGESTIONS, suggestions }
}

export function fetchSuggestions(lastWord) {
  return (dispatch) => {
    return axios.get('/api/corpora/testfile/').then(res => {
      dispatch(res.data)
    })
  }
}

export function reducer(prevState = initialState, action) {
  switch (action.type) {
    case UPDATE_TEXT:
      return Object.assign({}, prevState, { text: action.newText })
    case ADD_TO_TEXT:
      return Object.assign({}, prevState, { text: prevState.text + action.newText })
    case UPDATE_SUGGESTIONS:
      return Object.assign({}, prevState, { suggestions: action.suggestions })
    default:
      return prevState
  }
}

const store = createStore(reducer, applyMiddleware(thunk, logger))
export default store
