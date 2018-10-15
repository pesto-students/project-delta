import { shallow, mount } from 'enzyme';
import React from 'react';

import LoginContainer from '../LoginContainer';
import { HTTP } from '../../Services/http';

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

  describe('<NotificationBlock />', () => {
    it('should not render on initial load', () => {
      const wrapper = shallow(<LoginContainer />);

      const component = wrapper.find('NotificationBlock');
      expect(component.exists()).toBe(false);
    });

    it('should render when `loginStatus` state changes', () => {
      const wrapper = mount(<LoginContainer />);

      wrapper.setState({
        loginStatus: 'success',
        message: 'Test message',
      });
      const component = wrapper.find('NotificationBlock');
      expect(component.exists()).toBe(true);
      expect(component.props().message).toBe('Test message');
    });
  });

  describe('handleSuccess()', () => {
    it('should update loginStatus as `FAILED` for status code 400', () => {
      const wrapper = shallow(<LoginContainer />);
      const instance = wrapper.instance();
      instance.handleSuccess({ status: 400 });

      expect(wrapper.state('loginStatus')).toBe(instance.LOGIN_STATUS.FAILED);
    });

    it('should update loginStatus as `SUCCESS` for status code 200', () => {
      const wrapper = shallow(<LoginContainer />);
      const instance = wrapper.instance();
      instance.handleSuccess({ status: 200 });

      expect(wrapper.state('loginStatus')).toBe(instance.LOGIN_STATUS.SUCCESS);
    });

    it('should update loginStatus as `FAILED` for other status code', () => {
      const wrapper = shallow(<LoginContainer />);
      const instance = wrapper.instance();
      instance.handleSuccess({ status: 500 });

      expect(wrapper.state('loginStatus')).toBe(instance.LOGIN_STATUS.FAILED);
    });
  });

  describe('handleError()', () => {
    it('should update loginStatus as `FAILED`', () => {
      const wrapper = shallow(<LoginContainer />);
      const instance = wrapper.instance();
      instance.handleError();

      expect(wrapper.state('loginStatus')).toBe(instance.LOGIN_STATUS.FAILED);
    });
  });

  describe('removeNotification()', () => {
    it('should reset loginStatus and message', () => {
      const wrapper = shallow(<LoginContainer />);
      const instance = wrapper.instance();
      instance.removeNotification();

      expect(wrapper.state('loginStatus')).toBe('');
      expect(wrapper.state('message')).toBe('');
    });
  });

  describe('handleLogin()', () => {
    it('should update loginStatus as `FAILED` for invalid email', () => {
      const wrapper = shallow(<LoginContainer />);
      const instance = wrapper.instance();
      instance.handleLogin('abc', jest.fn());

      expect(wrapper.state('loginStatus')).toBe(instance.LOGIN_STATUS.FAILED);
    });

    it('should call api endpoint `generateToken`', () => {
      jest.spyOn(HTTP, 'POST').mockImplementation(() => Promise.resolve({ status: 200 }));

      const wrapper = shallow(<LoginContainer />);
      const instance = wrapper.instance();
      const mockFn = jest.fn();
      instance.handleLogin('test@gmail.com', mockFn);

      expect(HTTP.POST).toHaveBeenCalledWith('/generateToken', { email: 'test@gmail.com' });
    });
  });
});
