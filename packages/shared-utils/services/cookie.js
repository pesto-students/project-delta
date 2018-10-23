export const getCookie = (key) => {
  const cookies = document.cookie.split('; ')
    .map(kvPair => kvPair.split('='))
    .filter(kvArr => kvArr[0] === key);

  if (cookies.length === 0) return null;

  return cookies[0][1];
};
