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
