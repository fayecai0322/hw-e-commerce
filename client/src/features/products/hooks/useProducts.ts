
import {useQuery} from "@tanstack/react-query";
import { getCategories, getProduct, getProducts } from "../api/productsApi";
export const productKeys = {
    // React Query 的缓存 key 管理
    all:["products"] as const,
    lists: ()=> [...productKeys.all, "list"] as const,
    detail: (id: string | number) => [...productKeys.all, "detail", id] as const,
    categories: ()=> [...productKeys.all, "categories"] as const,
};

export const useProducts = ()=>{
    return useQuery({
        queryKey : productKeys.lists(),
        queryFn: getProducts, //calling from api page
    });
}

export const useProduct = (id:string | number)=>{
    return useQuery({
        queryKey: productKeys.detail(id),
        queryFn: ()=> getProduct(id),
        enabled: Boolean(id),
    });
}

export const useCategories = () =>{
    return useQuery({
        queryKey: productKeys.categories(),
        queryFn: getCategories,
    })

}