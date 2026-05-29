import { BadRequestError, NotFoundError } from "../../core/errors";
import { getProductById } from "../products/product.service";
import type { AddCartItemInput, Cart, CartItem, UpdateCartItemInput } from "./types";


let cart: Cart = {
  id: 1,
  products: [],
  total: 0,
  discountedTotal: 0,
  userId: 1,
  totalProducts: 0,
  totalQuantity: 0,
};
// Omit<Cart, "id" | "products" | "userId">从 Cart 类型里拿掉 "id"、"products"、"userId" 这三个字段，剩下的字段组成一个新类型。
const calculateCartTotals = (products: CartItem[]): Omit<Cart, "id" | "products" | "userId"> =>{
    const total = products.reduce((sum, item)=> sum + item.total, 0);
    const discountedTotal = products.reduce((sum, item)=> sum + item.discountedTotal, 0);
    const totalProducts = products.length;
    const totalQuantity = products.reduce((sum,item)=> sum + item.quantity, 0);

    return {
        total,
        discountedTotal,
        totalProducts,
        totalQuantity,
    };
};

const createCartItem = (productId: number, quantity: number): CartItem => {
    if (quantity <= 0){
        throw new BadRequestError("Quantity must be greater than 0");
    }
    const product = getProductById(productId);
    const total = product.price * quantity;
    const discountedTotal = total * (1 - product.discountPercentage / 100);

    return {
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: quantity,
        total: total,
        discountPercentage: product.discountPercentage,
        discountedTotal : discountedTotal,
        thumbnail: product.thumbnail,
    }
}

const rebuildCart = (products: CartItem[]): Cart => {
    const totals = calculateCartTotals(products);
    cart = {
        ...cart,
        products,
        ...totals,
    }
    return cart;
}

export const getCart = (): Cart=>{
    return cart;
}

export const addCartItem = (input: AddCartItemInput): Cart =>{
    const existingItem = cart.products.find(
        (item)=> item.id === input.productId
    );
    if (existingItem){
        const updatedProducts = cart.products.map((item)=>
        item.id === input.productId? createCartItem(input.productId, item.quantity + input.quantity) : item,
        );
        return rebuildCart(updatedProducts);
    }
    const newItem = createCartItem(input.productId, input.quantity);
    return rebuildCart([...cart.products, newItem]);
}

export const updateCartItem = (
  productId: number,
  input: UpdateCartItemInput,
): Cart => {
  const existingItem = cart.products.find((item) => item.id === productId);

  if (!existingItem) {
    throw new NotFoundError("Cart item not found");
  }

  const updatedProducts = cart.products.map((item) =>
    item.id === productId ? createCartItem(productId, input.quantity) : item,
  );

  return rebuildCart(updatedProducts);
};

export const removeFromCart = (productId: number): Cart =>{
    const existingItem = cart.products.find((item)=> item.id === productId);
    if (!existingItem){
        throw new NotFoundError("Cart item not found");
    }
    const updateProducts = cart.products.filter((item)=> item.id !== productId);
    return rebuildCart(updateProducts);
}

export const clearCart = ():Cart => {
    return rebuildCart([]);
}
