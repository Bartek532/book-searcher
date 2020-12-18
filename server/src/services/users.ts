import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findUserByEmail = (email: string) => {
  return prisma.user.findFirst({ where: { email } });
};

export const findUserByToken = (token: string) => {
  return prisma.user.findFirst({
    where: { UserToken: { every: { token } } }
  });
};

export const findUsers = () => {
  return prisma.user.findMany({ include: { UserToken: true } });
};

export const activateUser = (id: number) => {
  return prisma.user.update({
    where: { id },
    data: { isActive: true }
  });
};

export const createUser = (name: string, email: string, password: string) => {
  return prisma.user.create({
    data: {
      name,
      email,
      password
    }
  });
};

export const addUserToken = (userId: number, token: string) => {
  return prisma.userToken.create({
    data: {
      User: { connect: { id: userId } },
      token
    }
  });
};

export const getUserBooks = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: { UserBookLibrary: true }
  });

  const books = user!.UserBookLibrary.map(item => item.bookId);

  return await prisma.book.findMany({
    where: { id: { in: books } },
    include: { UserBookRate: true, BookTag: true }
  });
};

export const deleteBookFromUserLibrary = async (
  userId: number,
  bookId: number
) => {
  return await prisma.userBookLibrary.delete({
    where: { bookId_userId: { bookId, userId } }
  });
};
