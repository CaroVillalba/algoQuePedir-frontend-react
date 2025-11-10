import type { Address } from './Address'

export interface User {
    id: number
    name: string
    surname: string
    location: string
    address: Address
}