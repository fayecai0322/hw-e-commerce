import { NextFunction, Request, Response } from "express";
import * as productService from "./product.service";

export const getProducts = (req: Request, res: Response)=>{
    const skip =
        typeof req.query.skip === "string" ? Number(req.query.skip) : undefined;
    const limit =
        typeof req.query.limit === "string" ? Number(req.query.limit) : undefined;
    const category =
        typeof req.query.category === "string" ? req.query.category : undefined;
    const search =
        typeof req.query.search === "string" ? req.query.search : undefined;
    const response = productService.getProducts({
        skip,
        limit,
        category,
        search,
    });
    res.json(response);
}

export const getProductById = (req: Request, res: Response, next: NextFunction)=>{
    try{
        const productId = Number(req.params.id);
        const product = productService.getProductById(productId);

        res.json(product);
    }catch(error){
        next(error);
    }
}

export const getCategories = (_req: Request, res: Response)=>{
    const categories = productService.getCategories();

    res.json(categories);
}


// 先理解 controller 是干嘛的：

// routes 只负责定义 URL：GET /api/products
// controller 负责真正处理请求：读数据、查产品、返回 JSON
// types.ts 负责定义数据长什么样


// req = request，请求进来的东西
// res = response，要返回出去的东西
// next = 把流程交给下一个 middleware，通常用于错误