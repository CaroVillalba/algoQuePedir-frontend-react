import { useState } from 'react'
import type { ReactNode } from 'react'
import type { CartItem } from '../types/Order'
import { CartContext } from '../hooks/useCart'

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<Record<number, CartItem[]>>({})

    const addItem = (item: CartItem, restaurantId: number) => {
        setCart(prev => {
            const items = prev[restaurantId] || []
            const existing = items.find(i => i.id === item.id)

            let updatedItems
            if (existing) {
                updatedItems = items.map(i =>
                    i.id === item.id
                        ? {
                            ...i,
                            qty: i.qty + item.qty,
                            total: (i.qty + item.qty) * i.unitPrice
                        }
                        : i
                )
            } else {
                updatedItems = [...items, item]
            }

            return {
                ...prev,
                [restaurantId]: updatedItems
            }
        })
    }

    const removeItem = (itemId: number, restaurantId: number) => {
        setCart(prev => ({
            ...prev,
            [restaurantId]: (prev[restaurantId] || []).filter(i => i.id !== itemId)
        }))
    }

    const clearCart = (restaurantId: number) => {
        setCart(prev => ({
            ...prev,
            [restaurantId]: []
        }))
    }

    const getItemsByRestaurant = (restaurantId: number) =>
        cart[restaurantId] || []

    const getTotalItemsByRestaurant = (restaurantId: number) =>
        (cart[restaurantId] || []).reduce((acc, item) => acc + item.qty, 0)

    const getSubtotalByRestaurant = (restaurantId: number) =>
        (cart[restaurantId] || []).reduce((acc, item) => acc + item.total, 0)

    return (
        <CartContext.Provider value={{
            addItem,
            removeItem,
            clearCart,

            getItemsByRestaurant,
            getTotalItemsByRestaurant,
            getSubtotalByRestaurant
        }}>
            {children}
        </CartContext.Provider>
    )
}
