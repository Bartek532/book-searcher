import { PrismaClient } from "@prisma/client";
import type { User } from "@book-searcher/types";
const prisma = new PrismaClient();

export const findUserByEmail = (email: string) => {
  return prisma.user.findFirst({ where: { email } });
};

export const findUserByToken = (token: string) => {
  return prisma.user.findFirst({
    where: { UserToken: { every: { token } } },
  });
};

export const createUser = (name: string, email: string, password: string) => {
  return prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
};

export const activateUser = (id: number) => {
  return prisma.user.update({
    where: { id },
    data: { isActive: true },
  });
};

export const addUserToken = (userId: number, token: string) => {
  return prisma.userToken.create({
    data: {
      userId,
      token,
    },
  });
};

export const addBookToLibrary = (userId: number, bookId: number) => {
  return prisma.userBookLibrary.create({
    data: { bookId, userId },
  });
};

export const fetchUserBook = (userId: number, bookId: number) => {
  return prisma.userBookLibrary.findUnique({
    where: { bookId_userId: { bookId, userId } },
  });
};

export const fetchUserLibrary = async (
  id: number,
  lastFetchedBookId: number,
  perPage: number,
) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: { UserBookLibrary: true },
  });

  const books = user!.UserBookLibrary.map((item) => item.bookId);

  return await prisma.book.findMany({
    where: { AND: [{ id: { in: books } }, { id: { gt: lastFetchedBookId } }] },
    take: perPage,
    include: { UserBookRate: true, BookTag: true },
  });
};

export const addBookToUserLibrary = (userId: number, bookId: number) => {
  return prisma.userBookLibrary.create({
    data: { bookId, userId },
  });
};

export const deleteBookFromUserLibrary = (userId: number, bookId: number) => {
  return prisma.userBookLibrary.delete({
    where: { bookId_userId: { bookId, userId } },
  });
};

export const updateUserInfo = (data: User) => {
  return prisma.user.update({
    where: { id: data.id },
    data,
  });
};
