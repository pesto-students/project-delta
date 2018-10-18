export const getCookie = (key) => {
  const cookies = document.cookie.split('; ')
    .map(kvpair => kvpair.split('='))
    .filter(kvArr => kvArr[0] === key);

  if (cookies.length === 0) return null;

  return cookies[0][1];
};
