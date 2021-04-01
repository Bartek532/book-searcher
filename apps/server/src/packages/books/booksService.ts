import type { File } from "formidable";
import type { Book } from "@book-searcher/types";
import cloudinary from "cloudinary";
import type { Pagination } from "../../types";
import { PrismaClient, Prisma } from "@prisma/client";
import { tags as bookTags } from "@book-searcher/data";
import { generatePaginationOptions } from "../../utils";

const prisma = new PrismaClient();

export const fetchBooks = (lastFetchedBookId: number, perPage: number) => {
  return prisma.book.findMany({
    where: { id: { gt: lastFetchedBookId } },
    include: { UserBookRate: true, BookTag: true },
    take: perPage,
  });
};

/*

export const fetchBooks = async (pagination: Pagination) => {
  const query = {
    orderBy: { place: "asc" as Prisma.SortOrder },
  };

  const totalCount = await prisma.book.count(query);

  const results = await prisma.book.findMany({
    ...query,
    ...generatePaginationOptions(pagination),
  });

  return { results, totalCount };
};

*/

export const fetchBook = (slug: string) => {
  return prisma.book.findFirst({
    where: {
      slug,
    },
    include: { UserBookRate: true, BookTag: true },
    orderBy: { place: "asc" },
  });
};

export const fetchSeries = async () => {
  const series = await prisma.book.findMany({
    select: { series: true },
    distinct: ["series"],
  });

  return series.filter(({ series }) => series).map((item) => item.series);
};

export const fetchBooksBySeries = (series: string) => {
  return prisma.book.findMany({
    where: {
      series,
    },
    include: { UserBookRate: true, BookTag: true },
    orderBy: { place: "asc" },
  });
};

export const fetchBooksByQuery = (query: string) => {
  return prisma.book.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          author: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          series: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    include: { UserBookRate: true, BookTag: true },
    orderBy: { place: "asc" },
  });
};

export const fetchBooksByFilters = (
  filters: Record<string, string | number>,
) => {
  return prisma.book.findMany({
    where: { ...filters },
    include: { UserBookRate: true, BookTag: true },
    orderBy: { place: "asc" },
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
              { author: { contains: query.author || "", mode: "insensitive" } },
            ],
          },
        ],
      },
      include: { UserBookRate: true, BookTag: true },
      orderBy: { place: "asc" },
    });
  }

  return prisma.book.findMany({
    where: {
      AND: [
        { name: { contains: query.name || "", mode: "insensitive" } },
        { author: { contains: query.author || "", mode: "insensitive" } },
      ],
    },
    include: { UserBookRate: true, BookTag: true },
    orderBy: { place: "asc" },
  });
};

export const getBookByUserRate = (userId: number, bookId: number) => {
  return prisma.userBookRate.findUnique({
    where: { bookId_userId: { userId, bookId } },
  });
};

export const updateBookRates = (
  userId: number,
  bookId: number,
  rate: number,
) => {
  return prisma.userBookRate.create({
    data: {
      rate,
      bookId,
      userId,
    },
  });
};

export const changeBookPosition = ({
  id,
  place,
  room,
}: {
  id: number;
  place: string;
  room: string;
}) => {
  return prisma.book.update({
    where: { id },
    data: { room, place },
  });
};

export const insertBook = async (
  data: Book & { rate: number; tags: string },
  img: File,
  userId: number,
) => {
  const uploadedFile = await cloudinary.v2.uploader.upload(img.path, {
    folder: "book_searcher",
    public_id: data.slug,
    use_filename: true,
  });

  const book = await prisma.book.create({
    data: {
      name: data.name,
      author: data.author,
      place: data.place,
      room: data.room,
      slug: data.slug,
      description: data.description,
      series: data.series || "",
      img: uploadedFile!.secure_url,
    },
  });

  await prisma.userBookRate.create({
    data: {
      rate: data.rate,
      bookId: book.id,
      userId,
    },
  });

  if (data.tags) {
    const tags = JSON.parse(data.tags);
    const filteredTags = tags.filter((tag: string) => bookTags.includes(tag));
    if (filteredTags.length) {
      for (const tag of filteredTags) {
        await prisma.bookTag.create({
          data: {
            tagName: tag,
            bookId: book.id,
          },
        });
      }
    }
  }

  return book;
};
