import { eq, or } from "drizzle-orm";
import { db } from "../../db";
import { users, type NewUser } from "./user.schema";

export const toPublicUser = (user: typeof users.$inferSelect) => {
  // Repositories strip password before returning user data to most callers.
  const { password, ...publicUser } = user;
  return publicUser;
};

export const findUsers = async () => {
  const rows = await db.select().from(users);
  return rows.map(toPublicUser);
};

export const findUserById = async (id: number) => {
  const [user] = await db.select().from(users).where(eq(users.id, id));
  return user ? toPublicUser(user) : null;
};

export const findPrivateUserByUsernameOrEmail = async (identifier: string) => {
  // Login and duplicate checks need access to the stored password hash.
  const [user] = await db
    .select()
    .from(users)
    .where(or(eq(users.username, identifier), eq(users.email, identifier)));

  return user ?? null;
};

export const createUser = async (input: NewUser) => {
  const [user] = await db.insert(users).values(input).returning();
  return toPublicUser(user);
};

export const updateUser = async (id: number, input: Partial<NewUser>) => {
  const [user] = await db
    .update(users)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(users.id, id))
    .returning();

  return user ? toPublicUser(user) : null;
};

export const deleteUser = async (id: number) => {
  const [user] = await db.delete(users).where(eq(users.id, id)).returning();
  return user ? toPublicUser(user) : null;
};
