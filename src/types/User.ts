import type { Address } from './Address'
import type { Ingredient } from './IngredientType'
import type { CriteriaData, CriteriaType } from './ProfileContextType'

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
    pendingRatings: PendingRating[]
    criteria: CriteriaType
    preferredRestaurants: []

}

export interface PendingRating {
    local: string,
    lastOrderDate: string
}