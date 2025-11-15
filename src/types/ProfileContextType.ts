import type { Dispatch, SetStateAction } from 'react'
import type { Local } from './Local'

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
    setCheckedVegan : ( value : boolean ) => void
    checkedExquisite : boolean
    setCheckedExquisite : ( value: boolean ) => void
    checkedConservative : boolean,
    setCheckedConservative : ( value : boolean ) => void
    checkedImpatient : boolean
    setCheckedImpatient : ( value: boolean ) => void
    distance : number
    setDistance : ( value: number ) => void
    getRestaurants: () => Promise<Local[]>
}