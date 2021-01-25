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
    orderBy: { place: "asc" }
  });
};

export const fetchBook = (slug: string) => {
  return prisma.book.findFirst({
    where: {
      slug
    },
    include: { UserBookRate: true, BookTag: true },
    orderBy: { place: "asc" }
  });
};

export const fetchBooksBySeries = (series: string) => {
  return prisma.book.findMany({
    where: {
      series
    },
    include: { UserBookRate: true, BookTag: true },
    orderBy: { place: "asc" }
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
    include: { UserBookRate: true, BookTag: true },
    orderBy: { place: "asc" }
  });
};

export const fetchBooksByFilters = (filters: object) => {
  return prisma.book.findMany({
    where: { ...filters },
    include: { UserBookRate: true, BookTag: true },
    orderBy: { place: "asc" }
  });
};

export const advancedFetchBooks = (query: {
  name?: string;
  author?: string;
  tags: string[];
}) => {
  if (query.tags && query.tags.length) {
    return prisma.book.findMany({
      where: {
        AND: [
          { BookTag: { some: { tagName: { in: query.tags } } } },
          {
            AND: [
              { name: { contains: query.name || "", mode: "insensitive" } },
              { author: { contains: query.author || "", mode: "insensitive" } }
            ]
          }
        ]
      },
      include: { UserBookRate: true, BookTag: true }
    });
  }

  return prisma.book.findMany({
    where: {
      AND: [
        { name: { contains: query.name || "", mode: "insensitive" } },
        { author: { contains: query.author || "", mode: "insensitive" } }
      ]
    },
    include: { UserBookRate: true, BookTag: true },
    orderBy: { place: "asc" }
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
    if (error)
      return res.status(400).json({ message: error.details[0].message });

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

        const tags = JSON.parse(fields.tags as string);

        if (tags.length) {
          for (const tag of tags) {
            await prisma.bookTag.create({
              data: {
                Book: { connect: { id: book.id } },
                Tag: { connect: { name: tag } }
              }
            });
          }
        }

        res.status(200).json(book);
      }
    );
  });
};

export const changeBookPosition = (data: {
  id: number;
  room: string;
  place: string;
}) => {
  return prisma.book.update({
    where: { id: data.id },
    data: { room: data.room, place: data.place }
  });
};
