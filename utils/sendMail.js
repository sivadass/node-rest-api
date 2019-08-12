const dotenv = require("dotenv");
const sgMail = require("@sendgrid/mail");

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = function sendEmail(msg) {
  sgMail.send(msg);
};
