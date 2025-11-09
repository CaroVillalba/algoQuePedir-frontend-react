export interface Local {
    id: number
    name: string
    address: string
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
