import productsData from "../../db/seed/products.json";
import { NotFoundError } from "../../core/errors";
import type { Product, ProductsResponse } from "./types";

const products = productsData as Product[];

export interface GetProductsOptions {
  skip?: number;
  limit?: number;
  category?: string;
  search?: string;
}

export const getProducts = (options: GetProductsOptions = {}): ProductsResponse => {
  const {
    skip = 0,
    limit = products.length,
    category,
    search,
  } = options;

  let filteredProducts = [...products];

  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category,
    );
  }

  if (search) {
    const normalizedSearch = search.toLowerCase();

    filteredProducts = filteredProducts.filter((product) =>
      product.title.toLowerCase().includes(normalizedSearch) ||
      product.description.toLowerCase().includes(normalizedSearch) ||
      (product.brand?? "").toLowerCase().includes(normalizedSearch), //some products do not have brand
    );
  }

  const paginatedProducts = filteredProducts.slice(skip, skip + limit);
  return {
    products: paginatedProducts,
    total: filteredProducts.length,
    skip,
    limit,
  };
};

export const getProductById = (id: number): Product => {
  const product = products.find((item) => item.id === id);

  if (!product) {
    throw new NotFoundError("Product not found");
  }

  return product;
};

export const getCategories = (): string[] => {
  return Array.from(new Set(products.map((product) => product.category)));
};
