import { useQuery } from "@tanstack/react-query"
import { getCarousel, getCarousels } from "../api/CarouselsApi"


export const useCarousel = () => {
    return useQuery({ queryKey: ['carousel'], queryFn: getCarousel })
}

export const useCarousels = () => {
    return useQuery({ queryKey: ['carousels'], queryFn: getCarousels })
}
