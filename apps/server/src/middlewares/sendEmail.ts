import nodemailer from "nodemailer";
import { google } from "googleapis";

interface UserTypes {
  subject: string;
  email: string;
  html: string;
}

export const sendMail = ({ subject, email, html }: UserTypes) => {
  const OAuth2 = google.auth.OAuth2;

  const myOAuth2Client = new OAuth2(
    process.env.USER_ID_TOKEN,
    process.env.USER_SECRET_TOKEN,
  );

  myOAuth2Client.setCredentials({
    refresh_token: process.env.USER_REFRESH_TOKEN,
  });

  let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      type: "OAuth2",
      user: process.env.USER_MAIL,
      clientId: process.env.USER_ID_TOKEN,
      clientSecret: process.env.USER_SECRET_TOKEN,
      refreshToken: process.env.USER_REFRESH_TOKEN,
      expires: 1484314697598,
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
