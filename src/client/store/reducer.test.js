import { expect } from 'chai'
import { reducer } from './index'

describe('reducer', () => {
  it('is a function', () => {
    expect(reducer).to.be.a('function')
  })

  describe('when called with a state and a nonexistent action', () => {
    it('returns the state unchanged', () => {
      const testState = { text: 'bar baz' }
      expect(
        reducer(testState, { type: 'NOTHING', data: 'not a real action' })
      ).to.equal(testState)
    })
  })

  describe('when passed UPDATE_TEXT action', () => {
    it('returns an object with the newText of the action as its text', () => {
      const testState = { text: 'bar baz' }
      expect(
        reducer(testState, { type: 'UPDATE_TEXT', newText: 'new string' }).text
      ).to.equal('new string')
    })

    it('copies over key/value pairs other than text unchanged', () => {
      const testState = { text: 'bar baz', otherThing: 12 }
      expect(
        reducer(testState, { type: 'UPDATE_TEXT', newText: 'new string' })
          .otherThing
      ).to.equal(12)
    })
  })

  describe('when passed ADD_TO_TEXT action', () => {
    it('returns an object with the newText of the action appended to its text', () => {
      const testState = { text: 'bar baz' }
      expect(
        reducer(testState, { type: 'ADD_TO_TEXT', newText: ' foo' }).text
      ).to.equal('bar baz foo')
    })

    it('copies over key/value pairs other than text unchanged', () => {
      const testState = { text: 'bar baz', otherThing: 12 }
      expect(
        reducer(testState, { type: 'ADD_TO_TEXT', newText: ' foo' }).otherThing
      ).to.equal(12)
    })
  })

  describe('when passed UPDATE_SUGGESTIONS action', () => {
    it('returns an object with the suggestions', () => {
      const testState = { text: 'bar baz' }
      expect(
        reducer(testState, { type: 'UPDATE_SUGGESTIONS', suggestions: ['foo'] })
          .suggestions
      ).to.deep.equal(['foo'])
    })

    it('copies over key/value pairs other than suggestions', () => {
      const testState = { text: 'bar baz', otherThing: 12 }
      expect(
        reducer(testState, { type: 'UPDATE_SUGGESTIONS', suggestions: ['foo'] })
          .otherThing
      ).to.equal(12)
    })
  })

  describe('SWITCH_CORPUS action', () => {
    it('returns an object with the new corpus', () => {
      const testState = {
        corpus: 'Copper, Silver, Gold: an Indestructible Metallic Alloy',
      }
      expect(
        reducer(testState, {
          type: 'SWITCH_CORPUS',
          corpus:
            'Giraffes, Elephants, Baboons: An Equatorial Grasslands Bestiary',
        }).corpus
      ).to.deep.equal(
        'Giraffes, Elephants, Baboons: An Equatorial Grasslands Bestiary'
      )
    })

    it('copies over key/value pairs other than suggestions', () => {
      const testState = {
        corpus:
          'Giraffes, Elephants, Baboons: An Equatorial Grasslands Bestiary',
        otherThing: 12,
      }
      expect(
        reducer(testState, {
          type: 'SWITCH_CORPUS',
          corpus:
            'Giraffes, Elephants, Baboons: An Equatorial Grasslands Bestiary',
        }).otherThing
      ).to.equal(12)
    })
  })
})
