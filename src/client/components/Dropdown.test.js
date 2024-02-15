import React from 'react'
import { shallow } from 'enzyme'
import { Dropdown } from './Dropdown.jsx'

describe('Dropdown', () => {
  const testCorpora = [
    { name: 'Foo', route: 'foo' },
    { name: 'bar, baz', route: 'bar_baz' },
  ]

  let dropdown
  beforeEach(() => {
    dropdown = shallow(
      <Dropdown
        corpora={testCorpora}
        fetchCorpora={() => {}}
        handleChange={() => {}}
      />
    )
  })

  it('Renders a <select></select>', () => {
    expect(dropdown.find('select').length).toEqual(1)
  })

  it('fetches corpora', () => {
    let fetchSpy = jest.fn()
    dropdown = shallow(
      <Dropdown
        corpora={testCorpora}
        fetchCorpora={fetchSpy}
        handleChange={() => {}}
      />
    )
    expect(fetchSpy).toBeCalled()
  })

  describe('select', () => {
    let select
    beforeEach(() => {
      select = dropdown.find('select')
    })

    it('has an option for each corpus passed in props', () => {
      testCorpora.forEach(c => {
        expect(select.find(`option[value="${c.route}"]`).length).toEqual(1)
      })
    })

    it('each option has the nae of that corpus', () => {
      testCorpora.forEach(c => {
        expect(select.find(`option[value="${c.route}"]`).text()).toEqual(c.name)
      })
    })

    it('calls handleChange when changed', () => {
      const changeSpy = jest.fn()
      dropdown = shallow(
        <Dropdown
          corpora={testCorpora}
          fetchCorpora={() => {}}
          handleChange={changeSpy}
        />
      )

      select = dropdown.find('select')
      select.simulate('change', { target: { value: 'bar' } })
      expect(changeSpy).toBeCalledWith(true)
    })
  })
})
