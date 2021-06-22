const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");

const randomPassword = () => {
  return Math.random().toString(36).slice(-8);
};
var transporter = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE,
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASSWORD,
  },
});

module.exports.mailer = transporter;
module.exports.randomPassword = randomPassword;

// var mailOptions = {
//   from: "w.hasni49@gmail.com",
//   to: "luckynoob@yahoo.com",
//   subject: "Sending Email using Node.js",
//   text: "That was easy!",
// };

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email sent: " + info.response);
//   }
// });
