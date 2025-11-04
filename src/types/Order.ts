export interface CartItem {
    id: number
    name: string
    qty: number
    unitPrice: number
    total: number
}

export interface Restaurant {
    id: number
    name: string
    imageUrl: string
    rating: number
    distance: string
    deliveryFee: number
}

export interface CheckoutOrder {
    restaurantId: number
    items: CartItem[]
    paymentMethod: string
}

export interface Order {
    id: number
    restaurant: Restaurant
    items: CartItem[]
    subtotal: number
    paymentFee: number
    deliveryFee: number
    total: number
    paymentMethod?: string
}
