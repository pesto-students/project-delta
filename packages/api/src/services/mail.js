const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = (email, token) => {
  const msg = {
    to: email,
    from: 'deltapesto@gmail.com',
    subject: 'Welcome to Delta Pesto',
    text: 'Click this link to sign-in:',
    html: `<strong> <a href="http://localhost:5000/verifyToken?token=${token}">
    http://localhost:5000/verifyToken?token=${token}
  </a></strong>`,
  };
  return Promise.resolve(sgMail.send(msg));
};

module.exports = { sendMail };
