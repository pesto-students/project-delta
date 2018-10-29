import sharedConfig from '../../../shared-utils/config';

const { API_URL, DATE_FORMAT } = sharedConfig;

const FIREBASE = {
  apiKey: 'AIzaSyAKkYpQxqGCEfsF_XRsmS1IgOVAo5_nOKc',
  authDomain: 'project-delta-220322.firebaseapp.com',
  databaseURL: 'https://project-delta-220322.firebaseio.com',
  projectId: 'project-delta-220322',
  storageBucket: 'project-delta-220322.appspot.com',
  messagingSenderId: '43481274221',
};

const DEFAULT_PROFILE_PIC_URLS = {
  default: '/images/default-profile-pic.jpg',
  male: '/images/default-profile-pic-male.jpg',
  female: '/images/default-profile-pic-female.png',
};

export {
  API_URL,
  DATE_FORMAT,
  DEFAULT_PROFILE_PIC_URLS,
  FIREBASE,
};
