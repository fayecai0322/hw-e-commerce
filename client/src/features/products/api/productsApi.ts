import type { Product, ProductsResponse } from "../types";

const PRODUCTS_API_URL = "https://dummyjson.com/products";

export const getProducts = async ()=>{
    const response = await fetch(PRODUCTS_API_URL);

    if (!response.ok) {
        throw new Error("Failed to load products");
    }

    const data = await response.json() as ProductsResponse;
    return data.products;
}

export const getProduct = async (id:string | number)=>{
    const response = await fetch(`${PRODUCTS_API_URL}/${id}`);

    if (!response.ok) {
        throw new Error("Product not found");
    }

    const product = await response.json() as Product;
    return product;
}

export const getCategories = async ()=>{
    const response = await fetch(`${PRODUCTS_API_URL}/category-list`);

    if (!response.ok) {
        throw new Error("Failed to load categories");
    }

    const categories = await response.json() as string[];
    return categories;
}
