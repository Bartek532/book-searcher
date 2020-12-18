import nodemailer from "nodemailer";
import { google } from "googleapis";

interface UserTypes {
  address: string;
  email: string;
  name: string;
}

export const sendMail = (data: UserTypes) => {
  const OAuth2 = google.auth.OAuth2;

  const myOAuth2Client = new OAuth2(
    process.env.USER_ID_TOKEN,
    process.env.USER_SECRET_TOKEN
  );

  myOAuth2Client.setCredentials({
    refresh_token: process.env.USER_REFRESH_TOKEN
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
      expires: 1484314697598
    }
  });

  const mailOptions = {
    from: "Book Searcher book.searcher.app@gmail.com",
    to: data.email,
    subject: "Aktywacja konta",
    html: `<h1>Cześć, ${data.name}!</h1><span>Wygląda na to, że jeszcze nie aktywowałeś swojego konta. Kliknij w poniższy link, by to zrobić: </span> <br/>${data.address}<br/> <h4>To 
    takie proste!</h4><span>Jeśli nie zakładałeś konta w naszej aplikacji zignoruj tą wiadomość.</span>`
  };

  return transport.sendMail(mailOptions);
};
