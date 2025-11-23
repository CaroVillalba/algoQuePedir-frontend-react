import type { Dispatch, SetStateAction } from 'react'
import type { Local } from './Local'
import type { User } from './User'


export type CriteriaType = {
    faithful : boolean
    marketing: boolean
    vegan: boolean
    exquisite: boolean
    conservative: boolean
    impatient: boolean
}


export type ProfileData = {
    profileInfo: User;
    setProfileInfo: Dispatch<SetStateAction<User>>;
}


export type CriteriaData = {
    criteria: CriteriaType; setCriteria: Dispatch<SetStateAction<CriteriaType>>;
    distance: number; setDistance: Dispatch<SetStateAction<number>>;
}


export type RestaurantData = {
    availableRestaurants: Local[]; setAvailableRestaurants: Dispatch<SetStateAction<Local[]>>;
    selectedRestaurants: Local[]; setSelectedRestaurants: Dispatch<SetStateAction<Local[]>>;
    displayAddDialog: boolean; setDisplayAddDialog: (value: boolean) => void;
    getRestaurants: () => Promise<Local[]>;
}


export type IngredientData = {
    avoidIngredients: string[];
    setAvoidIngredients: Dispatch<SetStateAction<string[]>>;
    preferredIngredients: string[];
    setPreferredIngredients: Dispatch<SetStateAction<string[]>>;
}


export type ProfileContextType = {
    profile: ProfileData;
    criteria: CriteriaData;
    restaurant: RestaurantData;
    ingredients: IngredientData;
    showToast: (message: string, severity: 'success' | 'error' | 'warn') => void;
}
