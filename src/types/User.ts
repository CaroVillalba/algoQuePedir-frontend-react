import type { Address } from './Address'

export interface User {
    id: number
    firstname: string
    username: string
    lastname: string
    location: string
    address: Address
    email: string
}