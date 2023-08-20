import { User } from "@prisma/client";

export type setUser = Omit<User, 'id' | 'admin' | 'createdAt' | 'updatedAt'>;