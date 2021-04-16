export const sessionConfig = {
  name: "sessionId",
  secret: process.env.SECRET_SESSION as string,
  cookie: {
    secure: false,
    sameSite: "None",
    httpOnly: true,
  },
  resave: true,
  saveUninitialized: false,
};

if (process.env.NODE_ENV === "production") {
  sessionConfig.cookie.secure = true;
}
