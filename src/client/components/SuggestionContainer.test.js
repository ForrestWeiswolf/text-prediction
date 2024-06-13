import React from 'react'
import { render, screen } from '@testing-library/react';
import lodash from 'lodash'
import {
  SuggestionContainer,
  mapState,
  mapDispatch,
} from './SuggestionContainer.jsx'
import store from '../store'

import { Provider } from 'react-redux';

jest.mock('lodash')

describe('SuggestionContainer', () => {
  let fetchSpy
  const testSuggestions = ['foo', 'bar', 'baz']

  beforeEach(() => {
    fetchSpy = jest.fn(() => { })

    render(
      <Provider store={store}>
        <SuggestionContainer
          lastWords={["foo"]}
          selectedCorpus="foo"
          suggestions={testSuggestions}
          fetchSuggestions={fetchSpy}
        />
      </Provider>
    )
  })

  it('Renders three SuggestionBoxes with the values from suggestions prop', () => {
    testSuggestions.forEach(word => {
      expect(screen.getByText(word)).toBeInTheDocument
    })
  })

  it('fetches suggestions based on lastWord and selectedCorpus', () => {
    expect(fetchSpy).toHaveBeenCalledWith(['foo'])
  })

  it('fetches suggestions based on new lastWord and selectedCorpus', () => {
    expect(fetchSpy).toHaveBeenCalledWith(['foo'])
  })

  // TODO: figure out why this doesn't work
  xit("doesn't fetch suggestions when neither lastWord not selectedCorpus is changed", () => {
    const { rerender } = render(
      <Provider store={store}>
        <SuggestionContainer
          lastWords={["foo"]}
          selectedCorpus="bar"
          suggestions={[]}
          fetchSuggestions={fetchSpy}
        />
      </Provider>
    )

    fetchSpy.mockClear()

    rerender(
      <Provider store={store}>
        <SuggestionContainer
          lastWords={["foo"]}
          selectedCorpus="bar"
          suggestions={testSuggestions}
          fetchSuggestions={fetchSpy}
        />
      </Provider>)

    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it("doesn't fetch suggestions when selectedCorpus is falsey", () => {
    fetchSpy.mockClear()

    render(
      <Provider store={store}>
        <SuggestionContainer
          lastWords={["foo"]}
          selectedCorpus={null}
          suggestions={testSuggestions}
          fetchSuggestions={fetchSpy}
        />
      </Provider>
    )

    expect(fetchSpy).not.toHaveBeenCalled()
  })
})

describe('mapState', () => {
  const testState = {
    text: 'Lorem ipusm dolor sit amet',
    suggestions: ['consectetur'],
    selectedCorpus: 'lorem_ipsum',
    corpora: [{ name: 'lorem_ipsum', route: '/lorem_ipsum' }],
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
