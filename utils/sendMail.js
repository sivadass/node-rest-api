// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const SENDGRID_API_KEY =
  "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";
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(SENDGRID_API_KEY);

module.exports = function sendEmail(msg) {
  sgMail.send(msg);
};
