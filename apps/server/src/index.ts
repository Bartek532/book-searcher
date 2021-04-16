import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { notFound, catchErrors } from "./middlewares/errors";
import expressSession from "express-session";
import { sessionConfig } from "./config/session";
import { booksRoute } from "./packages/books/booksRoute";
import { usersRoute } from "./packages/users/usersRoute";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSession(sessionConfig));
app.use(
  cors({
    origin: ["http://localhost:8080", "https://book-searcher.vercel.app"],
    credentials: true,
  }),
);

app.use("/api/books", booksRoute);
app.use("/api/users", usersRoute);

app.use(notFound);
app.use(catchErrors);

const port = process.env.PORT || 3080;

app.listen(port, () => {
  console.log("Server is up");
});
