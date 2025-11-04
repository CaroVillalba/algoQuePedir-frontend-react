import { createContext, useContext } from 'react'
import type { CartItem } from '../types/Order'

export interface CartContextType {
    cartItems: CartItem[]
    restaurantId: number | null
    addItem: (item: CartItem, restaurantId: number) => void
    removeItem: (itemId: number) => void
    clearCart: () => void
    totalItems: number
    subtotal: number
}

export const CartContext = createContext<CartContextType>({} as CartContextType)

export const useCart = () => {
    const context = useContext(CartContext)
    
    if (context === undefined) {
        throw new Error('useCart debe ser usado dentro de un CartProvider')
    }
    
    return context
}