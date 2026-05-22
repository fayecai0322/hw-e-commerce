import { useQuery,useMutation, useQueryClient } from "@tanstack/react-query";
import { addCartItem, clearCart, getCart, removeCartItem } from "../api/cartApi"; 

export const cartKeys = {
    all: ["cart"] as const,
    detail: ()=> [...cartKeys.all, "detail"] as const,
};

export const useCart = ()=>{
    return useQuery({
        queryKey: cartKeys.detail(),
        queryFn: getCart,
    })
}

export const useAddCartItem = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : addCartItem,
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: cartKeys.all}); //Q: when to use all when to use detail?
        }
    })
}

export const useRemoveCartItem = ()=>{
        const queryClient = useQueryClient();
    return useMutation({
        mutationFn : removeCartItem,
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: cartKeys.all}); //Q: when to use all when to use detail?
        }
    })

}
export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      queryClient.setQueryData(cartKeys.detail(), (oldCart) => {
        if (!oldCart) {
          return oldCart;
        }

        return {
          ...oldCart,
          products: [],
          total: 0,
          discountedTotal: 0,
          totalProducts: 0,
          totalQuantity: 0,
        };
      });
    },
  });
};
