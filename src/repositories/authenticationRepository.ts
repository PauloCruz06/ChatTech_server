import { prisma } from "../config/database";
import { setUser } from "../types/userType";

export async function createNewUser(user: setUser) {
  await prisma.user.create({ data: user });
}

export async function updateUserById(id: number, user: Partial<setUser>) {
  await prisma.user.update({
    where: { id },
    data: { ...user }
  });
}

export async function getAllUsers() {
  return await prisma.user.findMany();
}

export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email }
  });
}

export async function deleteUserById(id: number) {
  await prisma.user.delete({
    where: { id }
  });
}
