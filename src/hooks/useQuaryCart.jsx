import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCart, addToCart, updateCartItem, removeFromCart } from "../api/cartApi";

export const useCart = (userId) => {
  return useQuery({
    queryKey: ["cart", userId],
    queryFn: () => getCart(userId),
    enabled: !!userId,
    staleTime: 1000 * 60,
  });
};

export const useAddToCart = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ product, existingItem }) => {
      if (existingItem) {
        return updateCartItem(existingItem.id, {
          quantity: existingItem.quantity + 1,
        });
      } else {
        return addToCart({ userId, productId: product.id, product });
      }
    },
    // Optimistic update
    onMutate: async ({ product, existingItem }) => {
      await queryClient.cancelQueries({ queryKey: ["cart", userId] });
      const previousCart = queryClient.getQueryData(["cart", userId]);

      queryClient.setQueryData(["cart", userId], (old = []) => {
        if (existingItem) {
          return old.map((c) =>
            c.id === existingItem.id
              ? { ...c, quantity: c.quantity + 1 }
              : c
          );
        } else {
          return [
            ...old,
            { id: Date.now(), userId, productId: product.id, product, quantity: 1 },
          ];
        }
      });

      return { previousCart };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart", userId], context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    },
  });
};

export const useUpdateCartQuantity = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, quantity }) => {
      if (quantity <= 0) {
        return removeFromCart(id);
      }
      return updateCartItem(id, { quantity });
    },
    onMutate: async ({ id, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ["cart", userId] });
      const previousCart = queryClient.getQueryData(["cart", userId]);

      queryClient.setQueryData(["cart", userId], (old = []) => {
        if (quantity <= 0) {
          return old.filter((c) => c.id !== id);
        }
        return old.map((c) => (c.id === id ? { ...c, quantity } : c));
      });

      return { previousCart };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart", userId], context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    },
  });
};

export const useRemoveFromCart = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => removeFromCart(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["cart", userId] });
      const previousCart = queryClient.getQueryData(["cart", userId]);

      queryClient.setQueryData(["cart", userId], (old = []) =>
        old.filter((c) => c.id !== id)
      );

      return { previousCart };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart", userId], context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    },
  });
};
