import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findFirst({ where: { email } });
};

export const findUserByToken = async (token: string) => {
  return await prisma.user.findFirst({
    where: { UserToken: { every: { token } } }
  });
};

export const findUsers = async () => {
  return await prisma.user.findMany({ include: { UserToken: true } });
};

export const activateUser = async (id: number) => {
  const user = await prisma.user.update({
    where: { id },
    data: { isActive: true }
  });

  return user;
};

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password
    }
  });

  return user;
};

export const addUserToken = async (userId: number, token: string) => {
  await prisma.userToken.create({
    data: {
      User: { connect: { id: userId } },
      token
    }
  });
};
