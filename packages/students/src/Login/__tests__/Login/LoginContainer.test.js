import { shallow } from 'enzyme';
import React from 'react';

import LoginContainer from '../../../Login/LoginContainer';

describe('<LoginForm />', () => {
  it('should render <LoginHeader />', () => {
    const wrapper = shallow(<LoginContainer />);

    const component = wrapper.find('LoginHeader');

    expect(component.exists()).toBe(true);
  });

  it('should render <LoginFooter />', () => {
    const wrapper = shallow(<LoginContainer />);

    const component = wrapper.find('LoginFooter');

    expect(component.exists()).toBe(true);
  });

  it('should render <LoginForm />', () => {
    const wrapper = shallow(<LoginContainer />);

    const component = wrapper.find('LoginForm');

    expect(component.exists()).toBe(true);
  });
});
