import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as authRepository from "../repositories/authenticationRepository";

dotenv.config();

export async function signUp(email: string, name: string, password: string) {
  const user = await authRepository.findUserByEmail(email);
  if (user)
    throw { code: 'Conflict', message: 'Email has been used' };

  const hashPassword = bcrypt.hashSync(password, 10);
  await authRepository.createNewUser({
    email,
    name,
    password: hashPassword
  });
}

export async function signIn(email: string, password: string) {
  const user = await authRepository.findUserByEmail(email);
  if (!user)
    throw { code: 'NotFound', message: 'User not found' };

  const compareHash = bcrypt.compareSync(password, user.password);
  if (!compareHash)
    throw { code: 'Unauthorized', message: 'Invalid password!' };

  const token = jwt.sign({
    id: user.id,
    email: user.email
  }, process.env.SECRET ?? 'secret', {
    expiresIn: 1800
  });

  return { ...user, token };
}
