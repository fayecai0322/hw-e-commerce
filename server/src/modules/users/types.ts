export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  image?: string | null;
  gender?: string | null;
}

export type PublicUser = Omit<User, "password">;

export interface CreateUserInput {
  username: string;
  email: string;
  password: string;
  role?: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  image?: string | null;
  gender?: string | null;
}

export interface UpdateUserInput {
  username?: string;
  email?: string;
  password?: string;
  role?: string;
  firstName?: string;
  lastName?: string;
  phone?: string | null;
  image?: string | null;
  gender?: string | null;
}
