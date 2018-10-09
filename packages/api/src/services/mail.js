const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('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');

const sendMail = (email, token) => {
  const msg = {
    to: email,
    from: 'deltapesto@gmail.com',
    subject: 'Welcome to Delta Pesto',
    text: 'Click this link to sign-in:',
    html: `<strong> <a href="http://localhost:5000/verifyToken?token=${token}">
    http://localhost:5000/verifyToken?token=${token}</a></strong>`,
  };
  return Promise.resolve(sgMail.send(msg));
};

module.exports = { sendMail };
