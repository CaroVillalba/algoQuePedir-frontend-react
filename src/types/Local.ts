export interface Local {
    id: number
    name: string
    rating: string
    deliveryDelay: number
    imgURL: string
    appCommission: number
}

export interface LocalPublic {
    id: number
    name: string
    imgURL: string
    rating: number
    reviews: number
    orders: number
}

export interface LocalCheckout {
    id: number;
    name: string;
    imgURL: string;
    freeDelivery: boolean;
    deliveryFee: number;
    paymentMethods: PaymentMethodTax[];
}

export interface PaymentMethodTax {
    name: string;
    tax: number;
}
