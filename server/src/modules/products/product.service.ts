import { NotFoundError } from "../../core/errors";
import * as productRepository from "./product.repository";

export interface GetProductsOptions {
  skip?: number;
  limit?: number;
  category?: string;
  search?: string;
}

export const getProducts = async (options: GetProductsOptions = {}) => {
  return productRepository.findProducts(options);
};

export const getProductById = async (id: number) => {
  const product = await productRepository.findProductById(id);

  // Services turn "not found" repository results into API-friendly errors.
  if (!product) {
    throw new NotFoundError("Product not found");
  }

  return product;
};

export const getCategories = async () => {
  return productRepository.findCategories();
};
