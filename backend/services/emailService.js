/**
 * ===========================================================
 * Email Service
 * ===========================================================
 */

const nodemailer = require("nodemailer");

/**
 * ===========================================================
 * Transporter
 * ===========================================================
 */

const transporter = nodemailer.createTransport({

  service: "gmail",

  auth: {

    user: process.env.MAIL_USER,

    pass: process.env.MAIL_APP_PASSWORD,

  },

});

/**
 * ===========================================================
 * Send Email
 * ===========================================================
 */

const sendEmail = async ({
  to,
  subject,
  html,
}) => {

 const info= await transporter.sendMail({

    from: `"ShopNova AI" <${process.env.MAIL_USER}>`,

    to,

    subject,

    html,

  });
  console.log(info);

};

module.exports = {
  sendEmail,
};