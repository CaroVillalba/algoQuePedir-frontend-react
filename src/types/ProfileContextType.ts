import type { Dispatch, SetStateAction } from 'react'
import type { Local } from './Local'
import type { User } from './User'


export type ProfileData = {
    profileInfo: User;
    setProfileInfo: Dispatch<SetStateAction<User>>;
}


export type CriteriaData = {
    checkedMarketing: boolean; setCheckedMarketing: Dispatch<SetStateAction<boolean>>;
    checkedVegan: boolean; setCheckedVegan: Dispatch<SetStateAction<boolean>>;
    checkedExquisite: boolean; setCheckedExquisite: Dispatch<SetStateAction<boolean>>;
    checkedConservative: boolean; setCheckedConservative: Dispatch<SetStateAction<boolean>>;
    checkedImpatient: boolean; setCheckedImpatient: Dispatch<SetStateAction<boolean>>;
    checkedFaithful: boolean; setCheckedFaithful: Dispatch<SetStateAction<boolean>>;
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
