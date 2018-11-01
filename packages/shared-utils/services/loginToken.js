export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => localStorage.getItem('token');

export const hasToken = () => {
  const loginToken = getToken();
  return loginToken !== null && loginToken !== undefined && loginToken !== '';
};

export const removeToken = () => localStorage.removeItem('token');
