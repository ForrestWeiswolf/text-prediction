import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen, within, cleanup } from '@testing-library/react';
import { Dropdown } from './Dropdown.jsx'

describe('Dropdown', () => {
  const testCorpora = [
    { name: 'Foo', route: 'foo' },
    { name: 'bar, baz', route: 'bar_baz' },
  ]

  beforeEach(() => {
    render(
      <Dropdown
        corpora={testCorpora}
        fetchCorpora={() => { }}
        handleChange={() => { }}
      />
    )
  })

  it('Renders a <select></select>', () => {
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('fetches corpora', () => {
    cleanup() // TODO: Figure out why this didn't work in an afterEach
    let fetchSpy = jest.fn()
    render(
      <Dropdown
        corpora={testCorpora}
        fetchCorpora={fetchSpy}
        handleChange={() => { }}
      />
    )
    expect(fetchSpy).toHaveBeenCalled()
  })

  it('has an option for each corpus passed in props', () => {
    const select = screen.getByRole('combobox')

    testCorpora.forEach(c => {
      const option = within(select).getByText(c.name);
      expect(option).toHaveAttribute('value', c.route);
    })
  })

  it('calls handleChange when changed', async () => {
    cleanup()
    const changeSpy = jest.fn()

    render(
      <Dropdown
        corpora={testCorpora}
        fetchCorpora={() => { }}
        handleChange={changeSpy}
      />
    )
    const select = screen.getByRole('combobox')

    await fireEvent.change(screen.getByRole('combobox'), { target: { value: 'bar_baz' } })
    expect(changeSpy).toHaveBeenCalledWith('bar_baz')
  })
})
