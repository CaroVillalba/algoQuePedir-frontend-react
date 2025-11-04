import { useState } from 'react'
import type { ReactNode}  from 'react'
import type { CartItem } from '../types/Order'
import { CartContext } from '../hooks/useCart'

// TODO: Mejorar los estilos de la interfaz del carrito
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [restaurantId, setRestaurantId] = useState<number | null>(null)

    const addItem = (itemToAdd: CartItem, restId: number) => {
        if (restaurantId !== null && restaurantId !== restId) {
            setCartItems([itemToAdd])
            setRestaurantId(restId)
            return
        }
        if (restaurantId === null) {
            setRestaurantId(restId)
        }
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === itemToAdd.id)
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === itemToAdd.id
                        ? { ...item, 
                            qty: item.qty + itemToAdd.qty, 
                            total: (item.qty + itemToAdd.qty) * item.unitPrice 
                        }
                        : item
                )
            } else {
                return [...prevItems, itemToAdd]
            }
        })
    }

    const removeItem = (itemId: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId))
    }

    const clearCart = () => {
        setCartItems([])
        setRestaurantId(null)
    }

    const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0)
    const subtotal = cartItems.reduce((acc, item) => acc + item.total, 0)

    return (
        <CartContext.Provider value={{ 
            cartItems, 
            restaurantId, 
            addItem, 
            removeItem, 
            clearCart,
            totalItems,
            subtotal 
        }}>
            {children}
        </CartContext.Provider>
    )
}