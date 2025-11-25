import type { Ingredient } from '../types/IngredientType'
import type { Rating } from '../types/Rating'
import { CRUDService } from "./CRUDService"


export class RatingService extends CRUDService<Rating> {
  constructor() {
    super('rating')
  }
}

export const ratingService = new RatingService()

