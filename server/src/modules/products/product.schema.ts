import { pgTable, integer, numeric, serial, text } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  discountPercentage: numeric("discount_percentage", {
    precision: 5,
    scale: 2,
  }).notNull(),
  rating: numeric("rating", { precision: 3, scale: 2 }).notNull(),
  stock: integer("stock").notNull(),
  brand: text("brand"),
  category: text("category").notNull(),
  thumbnail: text("thumbnail").notNull(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
