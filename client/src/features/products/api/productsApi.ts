import type { Product } from "../types";

export const getProducts = async ()=>{
    const response = await fetch("/products.json");

    if (!response.ok) {
        throw new Error("Failed to load products");
    }

    const products = await response.json() as Product[];
    return products;
}

export const getProduct = async (id:string | number)=>{
    const products = await getProducts();
    const product = products.find((product) => product.id === Number(id));

    if (!product) {
        throw new Error("Product not found");
    }

    return product;
}

export const getCategories = async ()=>{
    const products = await getProducts();

  return Array.from(new Set(products.map((product: Product) => product.category)));
}
