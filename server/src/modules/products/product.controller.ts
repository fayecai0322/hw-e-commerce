import type { NextFunction, Request, Response } from "express";
import { validate } from "../../core/validation/validate";
import * as productService from "./product.service";
import {
  getProductsQuerySchema,
  productParamsSchema,
} from "./product.validator";

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = validate(getProductsQuerySchema, req.query);

    const response = await productService.getProducts(query);

    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const params = validate(productParamsSchema, req.params);
    const product = await productService.getProductById(params.id);

    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categories = await productService.getCategories();

    res.json(categories);
  } catch (error) {
    next(error);
  }
};
