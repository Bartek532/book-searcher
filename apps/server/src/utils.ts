import slugx from "slugx";

export const createBookSlug = (title: string, author: string) => {
  const authorSurname = author.substring(author.lastIndexOf(" ") + 1 || 0);

  return slugx.create(title + " " + authorSurname);
};
