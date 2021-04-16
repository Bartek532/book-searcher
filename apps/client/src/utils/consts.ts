export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://backend-book-searcher.herokuapp.com"
    : "http://localhost:3080";
