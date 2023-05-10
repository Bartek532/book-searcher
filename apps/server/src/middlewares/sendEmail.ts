import nodemailer from "nodemailer";

interface UserTypes {
  subject: string;
  email: string;
  html: string;
}

export const sendMail = ({ subject, email, html }: UserTypes) => {
  let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.USER_MAIL,
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: "Book Searcher book.searcher.app@gmail.com",
    to: email,
    subject,
    html,
  };

  return transport.sendMail(mailOptions);
};
