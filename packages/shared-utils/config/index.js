module.exports = {
  get API_URL() {
    const { hostname } = window.location;

    if (/herokuapp\.com$/.test(hostname)) {
      return 'https://deltapesto-api.herokuapp.com';
    }

    // if we're not running this app on heroku, we'll assume it's non-prod
    //   and that the api server is available on the same hostname at port 5000
    return `http://${hostname}:5000`;
  },
  DATE_FORMAT: 'MMM D, YYYY',
};
