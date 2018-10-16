import sgMail from '@sendgrid/mail';

const { SENDGRID_API_KEY } = require('../../config');

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = (email, token, origin) => {
  const link = `${origin}/verifyToken?token=${token}`;
  const msg = {
    to: email,
    from: 'deltapesto@gmail.com',
    subject: 'Welcome to Delta Pesto',
    html: `Click <strong><a href="${link}">here</a></strong> to sign in`,
  };
  return Promise.resolve(sgMail.send(msg));
};

module.exports = { sendMail };
