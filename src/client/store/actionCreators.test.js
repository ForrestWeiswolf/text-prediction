import { expect } from 'chai'
import { updateText, addToText, updateSuggestions } from './index'

describe('updateText', () => {
  it('is a function', () => {
    expect(updateText).to.be.a('function')
  })

  it('creates an action with type UPDATE_TEXT', () => {
    expect(updateText('foo').type).to.equal('UPDATE_TEXT')
  })

  it('creates an action with passed argument as newText prop', () => {
    expect(updateText('foo').newText).to.equal('foo')
  })
})

describe('addToText', () => {
  it('is a function', () => {
    expect(addToText).to.be.a('function')
  })

  it('creates an action with type ADD_TO_TEXT', () => {
    expect(addToText('foo').type).to.equal('ADD_TO_TEXT')
  })

  it('creates an action with passed argument as newText prop', () => {
    expect(addToText('foo').newText).to.equal('foo')
  })
})

describe('updateSuggestions', () => {
  it('is a function', () => {
    expect(updateSuggestions).to.be.a('function')
  })

  it('creates an action with type UPDATE_SUGGESTIONS', () => {
    expect(updateSuggestions('foo').type).to.equal('UPDATE_SUGGESTIONS')
  })

  it('creates an action with passed argument as suggestions prop', () => {
    expect(updateSuggestions('foo').suggestions).to.equal('foo')
  })
})
