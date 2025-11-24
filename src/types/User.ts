import type { Address } from './Address'
import type { Ingredient } from './IngredientType'

export interface User {
    id: number
    firstname: string
    username: string
    lastname: string
    location: string
    preferredIngredients: Ingredient[]
    ingredientsToAvoid: Ingredient[]
    address: Address
    email: string
}