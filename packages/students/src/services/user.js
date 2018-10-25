// import { HTTP as httpService } from './http';

export function getUserProfile(id = 'me') { // eslint-disable-line no-unused-vars
  // return httpService.GET(`/users/${id}`);
  return Promise.resolve({
    _id: '111122223333111122223333',
    email: 'anirudh.nimmagadda@gmail.com',
    firstName: 'Anirudh',
    lastName: 'Nimmagadda',
    role: 'student',
    profilePicUrl: 'https://lh3.googleusercontent.com/-b2fwL216_m0/AAAAAAAAAAI/AAAAAAAAAAA/ZJocaz5rHUk/photo.jpg',
    batchId: '111111111111222222222222',
    batchCity: 'New Delhi',
    batchNumber: 2,
  });
}

export function updateUserProfile(newData, id = 'me') { // eslint-disable-line no-unused-vars
  // return httpService.POST(`/users/${id}`, newData);
  return Promise.resolve({ ...newData, _id: '111122223333111122223333' });
}
