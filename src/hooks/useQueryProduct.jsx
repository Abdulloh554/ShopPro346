import { useQuery } from "@tanstack/react-query"
import { getProduct, getProducts } from "../api/ProductApi"

export const useProduct = (id) => {
    return useQuery({ queryKey: ['product', id], queryFn: () => getProduct(id), enabled: !!id })
}

export const useProducts = () => {
    return useQuery({ queryKey: ['products'], queryFn: getProducts })
}
