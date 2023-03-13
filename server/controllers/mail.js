import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import "dotenv/config";
import asyncWrapper from "../middlewares/async-wrapper.js";

nodemailer.createTestAccount((err, account) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: account.user, // generated ethereal user
      pass: account.pass, // generated ethereal password
    },
  });
});

// all emails are catched by ethereal.email
const mailConfig = {
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "ethereal.user@ethereal.email",
    pass: "verysecret",
  },
};

const transporter = nodemailer.createTransport(mailConfig);

const MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Mailgen",
    link: "https://mailgen.js/",
  },
});

const registerMail = asyncWrapper(async (req, res) => {
  const { username, userEmail, text, subject } = req.body;

  // body of the email.
  const email = {
    body: {
      name: username,
      intro: text || "Welcome to re-code",
      outro:
        "Need help, or have question? just reply to this email, we'd love to help",
    },
  };

  const emailBody = MailGenerator.generate(email);
  const message = {
    from: "ethereal.user@ethereal.email",
    to: userEmail,
    subject: subject || "signup successful",
    html: emailBody,
  };

  // send mail
  const result = await transporter.sendMail(message);
  if (!result) {
    return next(
      createCustomError("Something failed during sending email", 200)
    );
  }
  res.status(200).json({ msg: "You got an email from us" });
});

export default registerMail;
