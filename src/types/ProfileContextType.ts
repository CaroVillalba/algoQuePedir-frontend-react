import type { Dispatch, SetStateAction } from 'react'
import type { Local } from './Local'
import type { User } from './User'

export type ProfileContextType = {
    checkedFaithful: boolean
    setCheckedFaithful: Dispatch<SetStateAction<boolean>>,
    availableRestaurants: Local[]
    setAvailableRestaurants: Dispatch<SetStateAction<Local[]>>
    selectedRestaurants: Local[]
    setSelectedRestaurants: Dispatch<SetStateAction<Local[]>>
    displayAddDialog : boolean,
    setDisplayAddDialog : ( value: boolean ) => void
    checkedMarketing: boolean
    setCheckedMarketing: ( value: boolean ) => void
    checkedVegan : boolean
    setCheckedVegan : Dispatch<SetStateAction<boolean>>
    checkedExquisite : boolean
    setCheckedExquisite : ( value: boolean ) => void
    checkedConservative : boolean,
    setCheckedConservative : ( value : boolean ) => void
    checkedImpatient : boolean
    setCheckedImpatient : ( value: boolean ) => void
    distance : number
    setDistance : ( value: number ) => void
    profileInfo : User
    setProfileInfo : Dispatch<SetStateAction<User>>
    username : string
    setUsername: Dispatch<SetStateAction<string>>
    getRestaurants: () => Promise<Local[]>
    handleSaveAll: () => void

}