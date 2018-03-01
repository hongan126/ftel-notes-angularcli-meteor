import {Meteor} from 'meteor/meteor';
import {WebApp} from 'meteor/webapp';

Meteor.startup(() => {

  WebApp.rawConnectHandlers.use(function (req, res, next) {
    if (req._parsedUrl.pathname.match(/(sockjs)/)) {
      res.setHeader('Access-Control-Allow-Origin', '*');
    }
    next();
  });

  if (Meteor.isServer) {
    Accounts.config({
      loginExpirationInDays: null
    });
  }
  Accounts.emailTemplates.siteName = 'FTEL Notes Tm.';
  Accounts.emailTemplates.from = 'ftelnotes@fpt.com';
  Accounts.emailTemplates.resetPassword = {
    subject() {
      return 'Reset Your Password - FTEL Notes';
    },
    text(user, url) {
      const username = user.profile.firstName + ' ' + user.profile.lastName,
        urlWithOutHash = url.replace('https://ftel-notes-api.herokuapp.com/#', 'https://ftel-notes.herokuapp.com');
      const emailBody = `Hello ` + username +
        `,\n\nTo reset your password, simply click the link below.\n\n` +
        urlWithOutHash +
        `\n\nBest regards!\n\nFTEL Notes`;
      return emailBody;
    }
  };
});
