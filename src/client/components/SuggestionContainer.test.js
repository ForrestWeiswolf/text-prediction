import React from 'react'
import { shallow } from 'enzyme'
import SuggestionBox from './SuggestionBox.jsx'
import lodash from 'lodash'
import {
  SuggestionContainer,
  mapState,
  mapDispatch,
} from './SuggestionContainer.jsx'

jest.mock('lodash')

describe('SuggestionContainer', () => {
  let suggestionContainer
  let fetchSpy
  const testSuggestions = ['foo', 'bar', 'baz']

  beforeEach(() => {
    fetchSpy = jest.fn(() => {})

    suggestionContainer = shallow(
      <SuggestionContainer
        lastWord=""
        selectedCorpus="foo"
        suggestions={testSuggestions}
        fetchSuggestions={fetchSpy}
      />
    )
  })

  it('Renders three SuggestionBox-es', () => {
    expect(suggestionContainer.find(SuggestionBox).length).toEqual(3)
  })

  it('passes them the values from suggestions prop', () => {
    const boxes = suggestionContainer.find(SuggestionBox)

    testSuggestions.forEach((word, idx) => {
      expect(boxes.at(idx).props().value).toEqual(word)
    })
  })

  it('fetches suggestions when rendered', () => {
    expect(fetchSpy).toBeCalled()
  })

  it('fetches suggestions based on lastWord and selectedCorpus', () => {
    suggestionContainer = shallow(
      <SuggestionContainer
        lastWords={["foo"]}
        selectedCorpus="bar"
        suggestions={testSuggestions}
        fetchSuggestions={fetchSpy}
      />
    )

    expect(fetchSpy).toBeCalledWith(['foo'])
  })

  it('fetches suggestions based on new lastWord and selectedCorpus', () => {
    suggestionContainer.setProps({
      lastWords: ['foo'],
      selectedCorpus: 'bar',
      suggestions: testSuggestions,
      fetchSuggestions: fetchSpy,
    })

    expect(fetchSpy).toBeCalledWith(['foo'])
  })

  it("doesn't fetch suggestions when neither lastWord not selectedCorpus is changed", () => {
    suggestionContainer.setProps({
      lastWords: ['foo'],
      selectedCorpus: 'bar',
      suggestions: testSuggestions,
      fetchSuggestions: fetchSpy,
    })

    fetchSpy.mockClear()

    suggestionContainer.setProps({
      lastWords: ['foo'],
      selectedCorpus: 'bar',
      suggestions: [],
      fetchSuggestions: fetchSpy,
    })

    expect(fetchSpy).not.toBeCalled()
  })

  it("doesn't fetch suggestions when selectedCorpus is falsey", () => {
    fetchSpy.mockClear()

    suggestionContainer.setProps({
      lastWords: ['foo'],
      selectedCorpus: null,
      suggestions: [],
      fetchSuggestions: fetchSpy,
    })

    expect(fetchSpy).not.toBeCalled()
  })
})

describe('mapState', () => {
  const testState = {
    text: 'Lorem ipusm dolor sit amet',
    suggestions: ['consectetur'],
    selectedCorpus: 'lorem_ipsum',
    corpora: [{name: 'lorem_ipsum', route: '/lorem_ipsum'}],
  }

  it('has suggestions from state', () => {
    expect(mapState(testState).suggestions).toEqual(testState.suggestions)
  })

  it('has selectedCorpus from state', () => {
    expect(mapState(testState).selectedCorpus).toEqual(
      testState.selectedCorpus
    )
  })

  it('has last words of text from state as lastWord prop', () => {
    expect(mapState(testState).lastWords).toEqual(['sit', 'amet'])
  })
})

describe('mapDispatch', () => {
  let dispatchSpy = jest.fn()
  beforeEach(() => {
    lodash.debounce.mockImplementation(() => dispatchSpy)
  })

  afterEach(() => {
    lodash.debounce.mockClear()
  })

  it('returns an object with a fetchSuggestions method', () => {
    expect(typeof mapDispatch(dispatchSpy).fetchSuggestions).toBe('function')
  })

  describe('fetchSuggestions method', () => {
    it('dispatches a fetchSuggestions action with array of its args', () => {
      mapDispatch(dispatchSpy).fetchSuggestions('foo')
      expect(dispatchSpy).toBeCalled()
    })

    it('is debounced to 200ms', () => {
      mapDispatch(dispatchSpy)
      expect(lodash.debounce).toBeCalled()
    })
  })
})
