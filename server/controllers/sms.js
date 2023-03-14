const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "YOUR_EMAIL_SERVICE_PROVIDER",
      auth: {
        user: "YOUR_EMAIL_ADDRESS",
        pass: "YOUR_EMAIL_PASSWORD",
      },
    });

    const mailOptions = {
      from: "YOUR_EMAIL_ADDRESS",
      to,
      subject,
      html,
    };

    const response = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}. Message ID: ${response.messageId}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default sendEmail;

/*
Add this code carefully

const express = require('express');
const router = express.Router();
const { sendEmail } = require('./sendEmail');

router.post('/sendEmail', async (req, res) => {
  try {
    const { to, subject, html } = req.body;
    const response = await sendEmail(to, subject, html);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
*/
