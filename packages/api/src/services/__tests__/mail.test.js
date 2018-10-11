const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey('invalid key');

describe('SendGrid', () => {
  it('should not send an email with invalid key', () => {
    const msg = {
      to: 'vipulrawat007@gmail.com',
      from: 'deltapesto@gmail.com',
      subject: 'Welcome to Delta Pesto',
      text: 'Click this link to sign-in:',
      html: '<strong>invalid Token </strong>',
    };
    sendgrid.send(msg, (err, json) => {
      if (err) {
        return;
      }
      console.log(json);  // eslint-disable-line
    });
  });
});
