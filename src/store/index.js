import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

const initialState = {
  text: '',
}

const UPDATE_TEXT = 'UPDATE_TEXT'

export function updateText(newText) {
  return { type: UPDATE_TEXT, newText }
}

function reducer(prevState = initialState, action) {
  switch (action.type) {
    case UPDATE_TEXT:
      return Object.assign({}, prevState, { text: action.newText })
    default:
      return prevState
  }
}

const store = createStore(reducer, applyMiddleware(logger))
export default store
