import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
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
    expect(dropdown.find('select').length).to.equal(1)
  })

  it('fetches corpora', () => {
    let fetchSpy = new spy()
    dropdown = shallow(
      <Dropdown
        corpora={testCorpora}
        fetchCorpora={fetchSpy}
        handleChange={() => {}}
      />
    )
    expect(fetchSpy.called).to.be.true
  })

  describe('select', () => {
    let select
    beforeEach(() => {
      select = dropdown.find('select')
    })

    it('has an option for each corpus passed in props', () => {
      testCorpora.forEach(c => {
        expect(select.find(`option[value="${c.route}"]`).length).to.equal(1)
      })
    })

    it('each option has the nae of that corpus', () => {
      testCorpora.forEach(c => {
        expect(select.find(`option[value="${c.route}"]`).text()).to.equal(c.name)
      })
    })

    it('calls handleChange when changed', () => {
      const changeSpy = spy()
      dropdown = shallow(
        <Dropdown
          corpora={testCorpora}
          fetchCorpora={() => {}}
          handleChange={changeSpy}
        />
      )

      select = dropdown.find('select')
      select.simulate('change', { target: { value: 'bar' } })
      expect(changeSpy.calledWith('bar')).to.be.true
    })
  })
})
