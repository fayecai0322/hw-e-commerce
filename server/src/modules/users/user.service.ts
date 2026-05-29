import userData from "../../db/seed/users.json";
import { BadRequestError, NotFoundError } from "../../core/errors";
import type { CreateUserInput, PublicUser, UpdateUserInput, User } from "./types";

type SeedUser = {
  username: string;
  email: string;
  plainPassword: string;
  role: string;
  firstName: string;
  lastName: string;
  phone?: string;
  image?: string;
  gender?: string;
};
//把 seed user 转成我们 API 内部要用的 User。
let users: User[] = (userData as SeedUser[]).map((user,index)=>({
  id: index + 1,
  username: user.username,
  email: user.email,
  password: user.plainPassword,
  role: user.role,
  firstName: user.firstName,
  lastName: user.lastName,
  phone: user.phone,
  image: user.image,
  gender: user.gender,
}))
// password 的 helper：
const toPublicUser = (user: User): PublicUser => {
  const { password, ...publicUser } = user;

  return publicUser;
};

export const getUsers = () : PublicUser[] => {
    return users.map(toPublicUser);
}

export const getUserById = (id: number): PublicUser => {
    const user = users.find((item)=> item.id === id);

    if(!user){
        throw new NotFoundError("User not found");
    }
    return toPublicUser(user);
}

export const findUserByUsernameOrEmail = (identifier: string): PublicUser => {
  const user = users.find(
    (item) => item.username === identifier || item.email === identifier,
  );

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return toPublicUser(user);
};

export const createUser = (input: CreateUserInput): PublicUser => {
  const existingUser = users.find(
    (user) => user.username === input.username || user.email === input.email,
  );

  if (existingUser) {
    throw new BadRequestError("Username or email already exists");
  }

  const newUser: User = {
    id: users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1,
    username: input.username,
    email: input.email,
    password: input.password,
    role: input.role ?? "user",
    firstName: input.firstName,
    lastName: input.lastName,
    phone: input.phone,
    image: input.image,
    gender: input.gender,
  };

  users = [...users, newUser];

  return toPublicUser(newUser);
};

export const updateUser = (id: number, input: UpdateUserInput): PublicUser => {
  const existingUser = users.find((user) => user.id === id);

  if (!existingUser) {
    throw new NotFoundError("User not found");
  }

  const nextUsername = input.username ?? existingUser.username;
  const nextEmail = input.email ?? existingUser.email;

  const duplicateUser = users.find(
    (user) =>
      user.id !== id &&
      (user.username === nextUsername || user.email === nextEmail),
  );

  if (duplicateUser) {
    throw new BadRequestError("Username or email already exists");
  }

  const updatedUser: User = {
    ...existingUser,
    ...input,
  };

  users = users.map((user) => (user.id === id ? updatedUser : user));

  return toPublicUser(updatedUser);
};

export const deleteUser = (id: number): PublicUser => {
  const existingUser = users.find((user) => user.id === id);

  if (!existingUser) {
    throw new NotFoundError("User not found");
  }

  users = users.filter((user) => user.id !== id);

  return toPublicUser(existingUser);
};