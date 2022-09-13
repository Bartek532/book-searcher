<h1 align="center">
<img src="https://i.ibb.co/bWpYcg7/book-searcher.png" alt="book-searcher logo" width="100%"/>

</h1>

<h4 align="center">Book Searcher - open source app for searching books.</h4>

## Project Overview 🎨

Book Searcher is an app to help me (and others 😁) search suitable book from my library. It includes authentication, so every user can create own account. In CRUD panel we can create or move books, but not only. Users can add book to their library and later find them in _my books_ section. Feel free to open an [issue](https://github.com/Bartek532/book-searcher/issues) if you find bug or something strange. Enjoy!

## Tech/framework used 🧰

- Common

| Tech                                | Description                                       |
| ----------------------------------- | ------------------------------------------------- |
| [Eslint](https://eslint.org/)       | Javascript Linter                                 |
| [Prettier](https://prettier.io/)    | Code formatter                                    |
| [Turborepo](https://turborepo.org/) | Tool for managing projects with multiple packages |

<br />

- Frontend

| Tech                                          | Description                                                 |
| --------------------------------------------- | ----------------------------------------------------------- |
| [Typescript](https://www.typescriptlang.org/) | Javascript superset language                                |
| [Vue 3](https://vuejs.org)                    | Progressive JavaScript Framework                            |
| [SCSS](https://sass-lang.com)                 | CSS with superpowers                                        |
| [Vue Router](https://router.vuejs.org)        | Official router for Vue.js                                  |
| [Vee-Validate](https://day.js.org)            | Form Validation for Vue.js                                  |
| [GSAP](https://greensock.com/gsap)            | Professional-grade JavaScript animations for the modern web |
| [Yup](https://github.com/jquense/yup)         | Schema builder for value parsing and validation.            |

<br />

- Backend

| Tech                                                             | Description                                                         |
| ---------------------------------------------------------------- | ------------------------------------------------------------------- |
| [Node](https://nodejs.org/en/)                                   | JavaScript runtime                                                  |
| [Express](https://expressjs.com)                                 | Web framework to Node.js                                            |
| [Typescript](https://www.typescriptlang.org/)                    | Javascript superset language                                        |
| [Express session](https://www.npmjs.com/package/express-session) | Simple session middleware for Express                               |
| [Nodemailer](https://nodemailer.com/)                            | Email sending in Node.js                                            |
| [Cloudinary](https://cloudinary.com)                             | Helpful with uploading images                                       |
| [Joi](https://joi.dev/api)                                       | Library for validation                                              |
| [Docker](https://www.docker.com/)                                | An open platform for developing, shipping, and running applications |
| [PostgreSQL](https://www.postgresql.org)                         | Relational database                                                 |
| [Prisma](https://www.prisma.io)                                  | ORM for TypeScript and Node.js                                      |

## Performance 💨

<img src="https://i.ibb.co/C0536yp/book-searcher-lighthouse.png" alt="book-searcher - lighthouse stats" >

## Installation 💿

```bash

git clone https://github.com/Bartek532/book-searcher.git

yarn install

#set up your environment variables
cp apps/server/.env-sample apps/server/.env
cp apps/client/.env-sample apps/client/.env

docker-compose up

docker exec -i book-searcher-db psql -U librarian -d book-searcher < DUMP.sql #import data to database

yarn dev

```

## Live 🎆

https://book-searcher.vercel.app
