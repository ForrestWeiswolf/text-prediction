import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { Dropdown } from './Dropdown.jsx'

describe('Dropdown', () => {
  const testCorpora = ['foo', 'bar']
  let dropdown
  beforeEach(() => {
    dropdown = shallow(<Dropdown corpora={testCorpora} />)
  })

  it('Renders a <select></select>', () => {
    expect(dropdown.find('select').length).to.equal(1)
  })

  describe('select', () => {
    let select
    beforeEach(() => {
      select = dropdown.find('select')
    })

    it('has an option for each corpus passed in props', () => {
      testCorpora.forEach(c => {
        expect(select.find(`option[value="${c}"]`).length).to.equal(1)
      })
    })
  })
})
