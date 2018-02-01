import {Meteor} from 'meteor/meteor';

Meteor.startup(() => {
  if (Meteor.isServer) {
    process.env.MAIL_URL = 'smtps://nsa1667%40gmail.com:65312%23%26gM@smtp.gmail.com:465/';
  }

  // Email.send({
  //   to: 'hongan126@gmail.com',
  //   from: "nsa1667@gmail.com",
  //   subject: "Example Email",
  //   text: "The contents of our email in plain text.",
  // });
});
