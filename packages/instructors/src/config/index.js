module.exports = {
  get API_URL() {
    return (
      // if we're running this app (students) locally,
      //   we'll connect to the local api deployment
      //   to avoid any possibility of messing with the prod DB
      // else we're running this app in production on heroku,
      //   so we'll connect to the production api deployment
      /localhost/.test(window.location.hostname)
        ? 'http://localhost:5000'
        : 'https://deltapesto-api.herokuapp.com'
    );
  },

  DATE_FORMAT: 'MMM D, YYYY',
};
