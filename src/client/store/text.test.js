import axios from 'axios'
import { updateText, addToText } from './index'

describe('updateText', () => {
  it('creates an action with type UPDATE_TEXT', () => {
    expect(updateText('foo').type).toEqual('UPDATE_TEXT')
  })

  it('creates an action with passed argument as newText prop', () => {
    expect(updateText('foo').newText).toEqual('foo')
  })
})

describe('addToText', () => {
  it('creates an action with type ADD_TO_TEXT', () => {
    expect(addToText('foo').type).toEqual('ADD_TO_TEXT')
  })

  it('creates an action with passed argument as newText prop', () => {
    expect(addToText('foo').newText).toEqual('foo')
  })
})
