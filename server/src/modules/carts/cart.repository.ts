import { and, eq } from "drizzle-orm";
import { db } from "../../db";
import { products } from "../products/product.schema";
import { carts, cartItems } from "./cart.schema";

const mapCart = (cart: typeof carts.$inferSelect, items: any[]) => {
  const mappedItems = items.map((item) => {
    const price = Number(item.product.price);
    const discountPercentage = Number(item.product.discountPercentage);
    const total = price * item.quantity;
    const discountedTotal = total * (1 - discountPercentage / 100);

    return {
      id: item.product.id,
      title: item.product.title,
      price,
      quantity: item.quantity,
      total,
      discountPercentage,
      discountedTotal,
      thumbnail: item.product.thumbnail,
    };
  });

  return {
    id: cart.id,
    userId: cart.userId,
    products: mappedItems,
    total: mappedItems.reduce((sum, item) => sum + item.total, 0),
    discountedTotal: mappedItems.reduce((sum, item) => sum + item.discountedTotal, 0),
    totalProducts: mappedItems.length,
    totalQuantity: mappedItems.reduce((sum, item) => sum + item.quantity, 0),
  };
};

export const findOrCreateCartByUserId = async (userId: number) => {
  const [existingCart] = await db.select().from(carts).where(eq(carts.userId, userId));

  if (existingCart) return existingCart;

  const [cart] = await db.insert(carts).values({ userId }).returning();
  return cart;
};

export const findCartByUserId = async (userId: number) => {
  const cart = await findOrCreateCartByUserId(userId);

  const items = await db
    .select({
      item: cartItems,
      product: products,
    })
    .from(cartItems)
    .innerJoin(products, eq(cartItems.productId, products.id))
    .where(eq(cartItems.cartId, cart.id));

  return mapCart(
    cart,
    items.map((row) => ({
      ...row.item,
      product: row.product,
    })),
  );
};

export const addCartItem = async (userId: number, productId: number, quantity: number) => {
  const cart = await findOrCreateCartByUserId(userId);

  const [existingItem] = await db
    .select()
    .from(cartItems)
    .where(and(eq(cartItems.cartId, cart.id), eq(cartItems.productId, productId)));

  if (existingItem) {
    await db
      .update(cartItems)
      .set({ quantity: existingItem.quantity + quantity })
      .where(eq(cartItems.id, existingItem.id));
  } else {
    await db.insert(cartItems).values({
      cartId: cart.id,
      productId,
      quantity,
    });
  }

  return findCartByUserId(userId);
};

export const updateCartItem = async (userId: number, productId: number, quantity: number) => {
  const cart = await findOrCreateCartByUserId(userId);

  const [item] = await db
    .update(cartItems)
    .set({ quantity })
    .where(and(eq(cartItems.cartId, cart.id), eq(cartItems.productId, productId)))
    .returning();

  return item ? findCartByUserId(userId) : null;
};

export const removeCartItem = async (userId: number, productId: number) => {
  const cart = await findOrCreateCartByUserId(userId);

  const [item] = await db
    .delete(cartItems)
    .where(and(eq(cartItems.cartId, cart.id), eq(cartItems.productId, productId)))
    .returning();

  return item ? findCartByUserId(userId) : null;
};

export const clearCart = async (userId: number) => {
  const cart = await findOrCreateCartByUserId(userId);

  await db.delete(cartItems).where(eq(cartItems.cartId, cart.id));

  return findCartByUserId(userId);
};
