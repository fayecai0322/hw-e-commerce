import { and, asc, count, eq, ilike, or, sql } from "drizzle-orm";
import { db } from "../../db";
import { products } from "./product.schema";

export interface FindProductsOptions {
  skip?: number;
  limit?: number;
  category?: string;
  search?: string;
}

const toProduct = (product: typeof products.$inferSelect) => ({
  ...product,
  price: Number(product.price),
  discountPercentage: Number(product.discountPercentage),
  rating: Number(product.rating),
  brand: product.brand ?? "",
});

export const findProducts = async (options: FindProductsOptions = {}) => {
  const { skip = 0, limit = 30, category, search } = options;

  const filters = [
    category ? eq(products.category, category) : undefined,
    search
      ? or(
          ilike(products.title, `%${search}%`),
          ilike(products.description, `%${search}%`),
          ilike(products.brand, `%${search}%`),
        )
      : undefined,
  ].filter(Boolean);

  const where = filters.length ? and(...filters) : undefined;

  const rows = await db
    .select()
    .from(products)
    .where(where)
    .orderBy(asc(products.id))
    .limit(limit)
    .offset(skip);

  const [{ total }] = await db
    .select({ total: count() })
    .from(products)
    .where(where);

  return {
    products: rows.map(toProduct),
    total,
    skip,
    limit,
  };
};

export const findProductById = async (id: number) => {
  const [product] = await db.select().from(products).where(eq(products.id, id));

  return product ? toProduct(product) : null;
};

export const findCategories = async () => {
  const rows = await db
    .selectDistinct({ category: products.category })
    .from(products)
    .orderBy(asc(products.category));

  return rows.map((row) => row.category);
};
