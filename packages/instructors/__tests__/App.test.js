import React from 'react';
import { shallow } from 'enzyme';

describe('Initial Jest Test', () => {
  it('should not crash', () => {
    expect('test').toBe('test');
  });
});

describe('Initial Enzyme Test', () => {
  it('should not crash', () => {
    const wrapper = shallow(<h1>Test</h1>);
    expect(wrapper.text()).toBe('Test');
  });
});
