import { shallow } from 'enzyme';
import React from 'react';

import { LoginContainer } from '../LoginContainer';
import { NotificationBlock } from '../../../../../shared-components/NotificationBlock';
import { HTTP } from '../../../../../shared-utils/services/http';
import { MSGS } from '../../../constants/MSGS';

describe('<LoginContainer />', () => {
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

      const component = wrapper.find(NotificationBlock);
      expect(component.exists()).toBe(false);
    });

    it('should render when `loginStatus` state changes', () => {
      const wrapper = shallow(<LoginContainer />);

      wrapper.setState({
        loginStatus: 'success',
        message: 'Test message',
      });

      const component = wrapper.find(NotificationBlock);
      expect(component.exists()).toBe(true);
      expect(component.props().message).toBe('Test message');
    });
  });

  describe('handleSuccess()', () => {
    it('should update loginStatus as `success`', () => {
      const wrapper = shallow(<LoginContainer />);
      const instance = wrapper.instance();
      instance.clearForm = jest.fn();
      instance.handleSuccess({ tokenStatus: 'success' });

      expect(wrapper.state('loginStatus')).toBe('success');
    });

    it('should call clearForm()', () => {
      const wrapper = shallow(<LoginContainer />);
      const instance = wrapper.instance();
      instance.clearForm = jest.fn();
      instance.handleSuccess({ tokenStatus: 'success' });

      expect(instance.clearForm).toBeCalled();
    });
  });

  describe('handleError()', () => {
    it('should update loginStatus as `error`', () => {
      const wrapper = shallow(<LoginContainer />);
      const instance = wrapper.instance();
      instance.handleError({ error: 'mock error' });

      expect(wrapper.state('loginStatus')).toBe('error');
    });

    it('should update message as `MSGS.EMAIL_INVALID` for EMAIL_INVALID', () => {
      const wrapper = shallow(<LoginContainer />);
      const instance = wrapper.instance();
      instance.handleError({ error: 'EMAIL_INVALID' });

      expect(wrapper.state('message')).toBe(MSGS.EMAIL_INVALID);
    });

    it('should update message as `MSGS.EMAIL_MISSING` for EMAIL_MISSING', () => {
      const wrapper = shallow(<LoginContainer />);
      const instance = wrapper.instance();
      instance.handleError({ error: 'EMAIL_MISSING' });

      expect(wrapper.state('message')).toBe(MSGS.EMAIL_MISSING);
    });

    it('should update message as `MSGS.UNKNOWN_ERROR` for other errors', () => {
      const wrapper = shallow(<LoginContainer />);
      const instance = wrapper.instance();
      instance.handleError({ error: 'test error' });

      expect(wrapper.state('message')).toBe(MSGS.UNKNOWN_ERROR);
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
    it('should update loginStatus as `error` for invalid email', () => {
      const wrapper = shallow(<LoginContainer />);
      const instance = wrapper.instance();
      instance.handleLogin('abc', jest.fn());

      expect(wrapper.state('loginStatus')).toBe('error');
    });

    it('should call api endpoint `generateToken`', () => {
      jest.spyOn(HTTP, 'POST').mockImplementation(() => Promise.resolve({ tokenStatus: 'success' }));

      const wrapper = shallow(<LoginContainer />);
      const instance = wrapper.instance();
      const mockFn = jest.fn();
      instance.handleLogin('test@gmail.com', mockFn);

      expect(HTTP.POST).toHaveBeenCalledWith('/generateToken', { email: 'test@gmail.com' });
    });
  });
});
