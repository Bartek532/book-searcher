import { Request, Response } from "express";
import formidable from "formidable";
import cloudinary from "cloudinary";
import slugx from "slugx";
import { validateBook } from "../validation";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const fetchBooks = () => {
  return prisma.book.findMany({
    include: { UserBookRate: true, BookTag: true },
    orderBy: { id: "asc" }
  });
};

export const fetchBook = (slug: string) => {
  return prisma.book.findFirst({
    where: {
      slug
    },
    include: { UserBookRate: true, BookTag: true }
  });
};

const tags = [
  "crime",
  "thriller",
  "food",
  "school",
  "youth",
  "detective",
  "science",
  "fantasy",
  "series",
  "jokes",
  "psychological",
  "kids",
  "beauty",
  "sci-fi",
  "horror",
  "adventure",
  "fact",
  "biography",
  "sport"
];

export const deleteBookById = (id: number) => {
  return prisma.book.delete({
    where: { id },
    include: { BookTag: true }
  });
};

export const fetchBooksBySeries = (series: string) => {
  return prisma.book.findMany({
    where: {
      series
    },
    include: { UserBookRate: true, BookTag: true }
  });
};
export const fetchBooksByQuery = (query: string) => {
  return prisma.book.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive"
          }
        },
        {
          author: {
            contains: query,
            mode: "insensitive"
          }
        },
        {
          description: {
            contains: query,
            mode: "insensitive"
          }
        }
      ]
    },
    include: { UserBookRate: true, BookTag: true }
  });
};

export const fetchBooksByFilters = (filters: object) => {
  return prisma.book.findMany({
    where: { ...filters },
    include: { UserBookRate: true, BookTag: true }
  });
};

export const advancedFetchBooks = (query: {
  name?: string;
  author?: string;
  tags: string[];
}) => {
  const filters = Object.fromEntries(
    Object.entries(query).filter(item => item[1] && item[0] != "tags")
  );
  if (query.tags && query.tags.length) {
    return prisma.book.findMany({
      where: {
        AND: [
          { BookTag: { some: { tagName: { in: query.tags } } } },
          { ...filters }
        ]
      },
      include: { UserBookRate: true, BookTag: true }
    });
  }
  return prisma.book.findMany({
    where: { ...filters },
    include: { UserBookRate: true, BookTag: true }
  });
};

export const updateBookRates = (
  userId: number,
  bookId: number,
  rate: number
) => {
  return prisma.userBookRate.create({
    data: {
      rate,
      Book: { connect: { id: bookId } },
      User: { connect: { id: userId } }
    }
  });
};

export const insertBook = async (data: Request, res: Response) => {
  const form = new formidable.IncomingForm();

  form.parse(data, async (err, fields, files) => {
    if (err) {
      throw new Error(err);
    }
    const { error } = validateBook(fields);
    if (error) return res.status(400).json({ message: err.details[0].message });

    const slug = slugx.create(
      fields.name +
        " " +
        (fields.author as string).substring(
          (fields.author as string).lastIndexOf(" ") + 1 || 0
        )
    );

    if (await fetchBook(slug)) {
      return res.status(400).json({ message: "Książka już istnieje." });
    }

    cloudinary.v2.uploader.upload(
      files.file.path,
      {
        folder: "book_searcher",
        public_id: slug,
        use_filename: true
      },
      async function (error, result) {
        const book = await prisma.book.create({
          data: {
            name: fields.name as string,
            author: fields.author as string,
            img: result!.secure_url,
            slug,
            room: fields.room as string,
            place: fields.place as string,
            series: fields.series as string,
            description: fields.description as string
          }
        });

        const { id: userId } = jwt.decode(data.authToken) as {
          id: number;
          iat: number;
        };

        await prisma.userBookRate.create({
          data: {
            rate: Number(fields.rate),
            Book: { connect: { id: book.id } },
            User: { connect: { id: userId } }
          }
        });

        for (const tag of JSON.parse(fields.tags as string)) {
          await prisma.bookTag.create({
            data: {
              Book: { connect: { id: book.id } },
              Tag: { connect: { name: tag } }
            }
          });
        }

        res.status(200).json(book);
      }
    );
  });
};
