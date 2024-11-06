import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const jwtSecret = process.env.JWT_SECRET as string;

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

export const login = async (
  email: string,
  password: string
): Promise<string | null> => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, jwtSecret, {
      expiresIn: "1h",
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { token },
    });

    return token;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
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