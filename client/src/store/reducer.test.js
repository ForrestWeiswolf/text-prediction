
import { reducer } from './index'

describe('reducer', () => {
  describe('when called with a state and a nonexistent action', () => {
    it('returns the state unchanged', () => {
      const testState = { text: 'bar baz' }
      expect(
        reducer(testState, { type: 'NOTHING', data: 'not a real action' })
      ).toEqual(testState)
    })
  })

  describe('when passed UPDATE_TEXT action', () => {
    it('returns an object with the newText of the action as its text', () => {
      const testState = { text: 'bar baz' }
      expect(
        reducer(testState, { type: 'UPDATE_TEXT', newText: 'new string' }).text
      ).toEqual('new string')
    })

    it('copies over key/value pairs other than text unchanged', () => {
      const testState = { text: 'bar baz', otherThing: 12 }
      expect(
        reducer(testState, { type: 'UPDATE_TEXT', newText: 'new string' })
          .otherThing
      ).toEqual(12)
    })
  })

  describe('when passed ADD_TO_TEXT action', () => {
    it('returns an object with the newText of the action appended to its text', () => {
      const testState = { text: 'bar baz' }
      expect(
        reducer(testState, { type: 'ADD_TO_TEXT', newText: ' foo' }).text
      ).toEqual('bar baz foo')
    })

    it('copies over key/value pairs other than text unchanged', () => {
      const testState = { text: 'bar baz', otherThing: 12 }
      expect(
        reducer(testState, { type: 'ADD_TO_TEXT', newText: ' foo' }).otherThing
      ).toEqual(12)
    })
  })

  describe('when passed UPDATE_SUGGESTIONS action', () => {
    it('returns an object with the suggestions', () => {
      const testState = { text: 'bar baz' }
      expect(
        reducer(testState, { type: 'UPDATE_SUGGESTIONS', suggestions: ['foo'] })
          .suggestions
      ).toEqual(['foo'])
    })

    it('copies over key/value pairs other than suggestions', () => {
      const testState = { text: 'bar baz', otherThing: 12 }
      expect(
        reducer(testState, { type: 'UPDATE_SUGGESTIONS', suggestions: ['foo'] })
          .otherThing
      ).toEqual(12)
    })
  })

  describe('SELECT_CORPUS action', () => {
    const testState = {
      selectedCorpus:
        'Giraffes, Elephants, Baboons: An Equatorial Grasslands Bestiary',
      otherThing: 12,
    }

    it('returns an object with the new corpus', () => {
      expect(
        reducer(testState, {
          type: 'SELECT_CORPUS',
          corpus:
            'Giraffes, Elephants, Baboons: An Equatorial Grasslands Bestiary',
        }).selectedCorpus
      ).toEqual(
        'Giraffes, Elephants, Baboons: An Equatorial Grasslands Bestiary'
      )
    })

    it('copies over key/value pairs other than suggestions', () => {
      expect(
        reducer(testState, {
          type: 'SELECT_CORPUS',
          corpus:
            'Giraffes, Elephants, Baboons: An Equatorial Grasslands Bestiary',
        }).otherThing
      ).toEqual(12)
    })
  })

  describe('when passed GET_CORPORA action', () => {
    it('returns an object with the corpora', () => {
      const testState = { corpora: [] }
      const testCorpus = { name: 'Foo', route: 'foo' }
      expect(
        reducer(testState, { type: 'GET_CORPORA', corpora: [testCorpus] })
          .corpora
      ).toEqual([testCorpus])
    })

    it("if state.selectedCorpus was falsey, sets it to the first corpus's route", () => {
      const testState = { corpora: [] }
      expect(
        reducer(testState, {
          type: 'GET_CORPORA',
          corpora: [{ name: 'Foo', route: 'foo' }],
        }).selectedCorpus
      ).toEqual('foo')
    })

    it('if state.selectedCorpus was truthy, leaves it unchanged', () => {
      const testState = { corpora: [], selectedCorpus: 'bar' }
      expect(
        reducer(testState, {
          type: 'GET_CORPORA',
          corpora: [{ name: 'Foo', route: 'foo' }],
        }).selectedCorpus
      ).toEqual('bar')
    })

    it('copies over other key/value pairs', () => {
      const testState = { corpora: [], otherThing: 12 }
      expect(
        reducer(testState, {
          type: 'GET_CORPORA',
          corpora: [{ name: 'Foo', route: 'foo' }],
        }).otherThing
      ).toEqual(12)
    })
  })
})
