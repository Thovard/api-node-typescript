import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const createUser = async (name: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  return user;
};

export const getUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
};

export const updateUser = async (id: number, name: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.update({
    where: { id },
    data: { name, email, password: hashedPassword },
  });
  return user;
};

export const deleteUser = async (id: number) => {
  await prisma.user.delete({
    where: { id },
  });
};

export const verifyPassword = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
      where: { email },
    });
  
    if (!user) {
      return null;
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return null;
    }
  
    return user;
  };