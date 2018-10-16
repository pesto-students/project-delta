import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';

import { LoginForm } from '../LoginForm';

const updateInput = (wrapper, instance, newValue) => {
  const input = wrapper.find(instance);
  input.simulate('change', {
    currentTarget: { value: newValue },
  });
};

describe('<LoginForm />', () => {
  it('should allow user to enter email', () => {
    const wrapper = shallow(<LoginForm handleLogin={() => {}} isLoggingIn={false} />);

    updateInput(wrapper, '[data-testid="email"]', 'test@gmail.com');
    const emailInput = wrapper.find('[data-testid="email"]');

    expect(emailInput.props().value).toBe('test@gmail.com');
  });

  it('should allow user to submit the form', () => {
    const handleLogin = jest.fn();
    const wrapper = shallow(<LoginForm handleLogin={handleLogin} isLoggingIn={false} />);

    updateInput(wrapper, '[data-testid="email"]', 'test@gmail.com');
    wrapper.find('[data-testid="loginForm"]').simulate('submit', { preventDefault: () => {} });

    const instance = wrapper.instance();

    expect(handleLogin).toHaveBeenCalledWith('test@gmail.com', instance.clearEmail);
  });

  it('should reset email when clearEmail() called', () => {
    const handleLogin = jest.fn();
    const wrapper = shallow(<LoginForm handleLogin={handleLogin} isLoggingIn={false} />);
    updateInput(wrapper, '[data-testid="email"]', 'test@gmail.com');

    const instance = wrapper.instance();

    instance.clearEmail();

    expect(instance.state.email).toBe('');
  });

  test('matches saved snapshot', () => {
    const wrapper = shallow(<LoginForm handleLogin={() => {}} isLoggingIn={false} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
