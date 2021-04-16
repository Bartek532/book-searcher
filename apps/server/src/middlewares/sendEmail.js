"use strict";
exports.__esModule = true;
exports.sendMail = void 0;
var nodemailer_1 = require("nodemailer");
var googleapis_1 = require("googleapis");
exports.sendMail = function (_a) {
    var subject = _a.subject, email = _a.email, html = _a.html;
    var OAuth2 = googleapis_1.google.auth.OAuth2;
    var myOAuth2Client = new OAuth2(process.env.USER_ID_TOKEN, process.env.USER_SECRET_TOKEN);
    myOAuth2Client.setCredentials({
        refresh_token: process.env.USER_REFRESH_TOKEN
    });
    var transport = nodemailer_1["default"].createTransport({
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
    var mailOptions = {
        from: "Book Searcher book.searcher.app@gmail.com",
        to: email,
        subject: subject,
        html: html
    };
    return transport.sendMail(mailOptions);
};
