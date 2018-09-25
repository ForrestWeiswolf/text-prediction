import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import axios from 'axios'

const initialState = {
  text: '',
  suggestions: [],
  corpus: 'inexorability'
}

const UPDATE_TEXT = 'UPDATE_TEXT'
const ADD_TO_TEXT = 'ADD_TO_TEXT'
const UPDATE_SUGGESTIONS = 'UPDATE_SUGGESTIONS'
const SWITCH_CORPUS = 'SWITCH_CORPUS'

export function updateText(newText) {
  return { type: UPDATE_TEXT, newText }
}

export function addToText(newText) {
  return { type: ADD_TO_TEXT, newText }
}

export function updateSuggestions(suggestions) {
  return { type: UPDATE_SUGGESTIONS, suggestions }
}

export function switchCorpus(corpus) {
  return { type: SWITCH_CORPUS, corpus }
}

export function fetchSuggestions(lastWord) {
  const wordRoute = lastWord ? lastWord : ''

  return (dispatch, getState) => {

    return axios.get(`/api/corpora/${getState().corpus}/` + wordRoute).then(res => {
      dispatch(updateSuggestions(res.data))
    })
  }
}

export function reducer(prevState = initialState, action) {
  switch (action.type) {
    case UPDATE_TEXT:
      return Object.assign({}, prevState, { text: action.newText })
    case ADD_TO_TEXT:
      return Object.assign({}, prevState, {
        text: prevState.text + action.newText,
      })
    case UPDATE_SUGGESTIONS:
      return Object.assign({}, prevState, { suggestions: action.suggestions })
    case SWITCH_CORPUS:
      return Object.assign({}, prevState, { corpus: action.corpus })
    default:
      return prevState
  }
}

const store = createStore(reducer, applyMiddleware(thunk, logger))
export default store
