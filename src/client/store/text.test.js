import { expect } from 'chai'
import axios from 'axios'
import { spy } from 'sinon'
import MockAdapter from 'axios-mock-adapter'
import { updateText, addToText } from './index'

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
