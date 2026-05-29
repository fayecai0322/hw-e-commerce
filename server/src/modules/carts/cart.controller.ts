//Controller 负责
//  从 req.params 或 req.body 拿数据
// 调用 cart service
// res.json(...) 返回结果，前端 React or curl的人
// 出错时 next(error) 交给 error middleware

import type { NextFunction, Request, Response } from "express";
import * as cartService from "./cart.service";

export const getCart = (_req: Request, res:Response) =>{
    const cart = cartService.getCart();
    res.json(cart);
};

export const addCartItem = (req: Request, res: Response, next: NextFunction)=>{
    try {
        const cart = cartService.addCartItem(req.body);
        res.status(201).json(cart);
    }catch(error){
        next(error);
    }
};

export const updateCartItem =  (req: Request, res: Response, next: NextFunction)=>{
    try{
        const productId = Number(req.params.productId); //route里定义了有productId
        const cart = cartService.updateCartItem(productId,req.body);
        res.json(cart);
    }catch(error){
        next(error);
    }
};

export const removeCartItem = (req: Request, res: Response, next:NextFunction)=> {
    try{
        const productId = Number(req.params.productId);
        const cart = cartService.removeFromCart(productId);
        res.json(cart);
    }catch(error){
        next(error);
    }
}

export const clearCart = (_req: Request, res: Response)=>{
    const cart = cartService.clearCart();
    res.json(cart);
}