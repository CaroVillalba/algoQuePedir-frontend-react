import { createContext, useContext } from 'react'
import type { CartItem } from '../types/Order'

export interface CartContextType {
    addItem: (item: CartItem, restaurantId: number) => void
    removeItem: (itemId: number, restaurantId: number) => void
    clearCart: (restaurantId: number) => void

    getItemsByRestaurant: (restaurantId: number) => CartItem[]
    getTotalItemsByRestaurant: (restaurantId: number) => number
    getSubtotalByRestaurant: (restaurantId: number) => number
}

export const CartContext = createContext<CartContextType>({} as CartContextType)

export const useCart = () => {
    const context = useContext(CartContext)
    
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider')
    }
    
    return {
        addItem: context.addItem,
        removeItem: context.removeItem,
        clearCart: context.clearCart,
        getItemsByRestaurant: context.getItemsByRestaurant,
        getTotalItemsByRestaurant: context.getTotalItemsByRestaurant,
        getSubtotalByRestaurant: context.getSubtotalByRestaurant
    }
}