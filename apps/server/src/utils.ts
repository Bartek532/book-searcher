import slugx from "slugx";
import type { Pagination } from "./types";

export const createBookSlug = (title: string, author: string) => {
  const authorSurname = author.substring(author.lastIndexOf(" ") + 1 || 0);

  return slugx.create(title + " " + authorSurname);
};

export const generatePaginationOptions = ({ page, perPage }: Pagination) => {
  return { skip: page * perPage - perPage, take: perPage };
};
