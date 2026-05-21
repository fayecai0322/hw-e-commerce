import { axiosClient } from "../../../lib/axiosClient";
import type { ProductsResponse, Product } from "../types"

export const getProducts = async ()=>{
    const response = await axiosClient.get<ProductsResponse | Product[]>("/products");

    if (Array.isArray(response.data)){
        return response.data;
    }
    return response.data.products;
}

export const getProduct = async (id:string | number)=>{
    const response = await axiosClient.get<Product>(`/products/${id}`);
    return response.data;
}

export const getCategories = async ()=>{
    const products = await getProducts();

  return Array.from(new Set(products.map((product: Product) => product.category)));
}