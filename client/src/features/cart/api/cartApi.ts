import type { AddCartItemInput, Cart, RemoveCartItemInput } from "../types";

const CARTS_API_URL = "https://dummyjson.com/carts";

export const getCart = async (): Promise<Cart> => {
  const response = await fetch(`${CARTS_API_URL}/1`);

  if (!response.ok) {
    throw new Error("Failed to load cart");
  }
  return response.json();
};

export const addCartItem = async ({
  productId,
  quantity,
}: AddCartItemInput): Promise<Cart> => {
  const response = await fetch(`${CARTS_API_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: 1,
      products: [
        {
          id: productId,
          quantity,
        },
      ],
    }),
  });
  if (!response.ok){
    throw new Error("Failed add cart item");
  }
  return response.json();
};

export const removeCartItem = async (_input: RemoveCartItemInput) : Promise<Cart> => {
    const response = await fetch(`${CARTS_API_URL}/1`,{
        method: "DELETE",
    })
    if (!response.ok){
        throw new Error("Failed remove cart item");
    }
    return response.json();
}

export const clearCart = async (): Promise<Cart> =>{
    const response = await fetch(`${CARTS_API_URL}/1`,{
        method:"DELETE",
    })
    if (!response.ok){
        throw new Error("Failed to clear cart");
    }
    return response.json();
}
