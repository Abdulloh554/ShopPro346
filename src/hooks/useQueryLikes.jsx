import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLikes, addLike, removeLike } from "../api/likesApi";

export const useLikes = (userId) => {
  return useQuery({
    queryKey: ["likes", userId],
    queryFn: () => getLikes(userId).then((data) => (Array.isArray(data) ? data : [])),
    enabled: !!userId,
    staleTime: 1000 * 60,
  });
};

export const useToggleLike = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ product, existingLike }) => {
      if (existingLike) {
        return removeLike(existingLike.id);
      } else {
        return addLike({ userId, productId: product.id, product });
      }
    },
    // Optimistic update — sahifa refresh bo'lmasdan darhol yangilanadi
    onMutate: async ({ product, existingLike }) => {
      await queryClient.cancelQueries({ queryKey: ["likes", userId] });
      const previousLikes = queryClient.getQueryData(["likes", userId]);

      queryClient.setQueryData(["likes", userId], (old = []) => {
        if (existingLike) {
          return old.filter((l) => l.id !== existingLike.id);
        } else {
          return [...old, { id: Date.now(), userId, productId: product.id, product }];
        }
      });

      return { previousLikes };
    },
    onSuccess: (data, { existingLike }) => {
      queryClient.setQueryData(["likes", userId], (old = []) => {
        if (existingLike) {
          return old.filter((l) => String(l.id) !== String(existingLike.id));
        }

        const filteredOld = old.filter(
          (l) => String(l.productId) !== String(data.productId)
        );
        return [...filteredOld, data];
      });
    },
    onError: (_err, _vars, context) => {
      if (context?.previousLikes) {
        queryClient.setQueryData(["likes", userId], context.previousLikes);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["likes", userId] });
    },
  });
};
