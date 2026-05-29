export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
  phone?: string;
  image?: string;
  gender?: string;
}

export type PublicUser = Omit<User, "password">;

export interface CreateUserInput {
  username: string;
  email: string;
  password: string;
  role?: string;
  firstName: string;
  lastName: string;
  phone?: string;
  image?: string;
  gender?: string;
}

export interface UpdateUserInput {
  username?: string;
  email?: string;
  password?: string;
  role?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  image?: string;
  gender?: string;
}
