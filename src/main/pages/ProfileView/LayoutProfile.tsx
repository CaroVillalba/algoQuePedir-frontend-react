import { useState } from 'react'
import type { Local } from '../../../types/Local'
import { useToast } from '../../../hooks/useToast'
import { Outlet } from 'react-router-dom'
import { Toast } from '../../../components/common/toast'
import '../../../toast.css'
import { getMensajeError, type ErrorResponse } from '../../../utils/errorHandling'
import { localService } from '../../../services/LocalService'
import { useOnInit } from '../../../hooks/useOnInit'
import type { User } from '../../../types/User'
import { authService } from '../../../services/AuthService'
import { userService } from '../../../services/UserService'
import type { FormEvent } from 'react'


export const LayoutProfile = () => {
        const [ checkedFaithful, setCheckedFaithful ] = useState(false)
        const [ availableRestaurants, setAvailableRestaurants ] = useState<Local[]>([])
        const [ selectedRestaurants, setSelectedRestaurants ] = useState<Local[]>([])
        const [ displayAddDialog, setDisplayAddDialog ] = useState(false)
        const [ checkedMarketing, setCheckedMarketing ] = useState(false)
        const [checkedVegan, setCheckedVegan] = useState(false)
        const [checkedExquisite, setCheckedExquisite] = useState(false)
        const [checkedConservative, setCheckedConservative] = useState(false)
        const [checkedImpatient, setCheckedImpatient] = useState(false)
        const [ distance, setDistance ] = useState<number>(1)
        const { toast, showToast } = useToast()
        const [profileInfo, setProfileInfo] = useState<User>({ 
                id : -1,
                firstname : '',
                username : '',
                lastname : '',
                location : '',
                address: {
                    street: '',
                    number: 0,
                    coordinates: {
                        x: 0,
                        y:0,
                    }
                },
                email: '',
        
            })
        const [ username, setUsername ] = useState('username')


        const [savedProfileInfo, setSavedProfileInfo] = useState<User>({
              id : -1,
                firstname : '',
                username : '',
                lastname : '',
                location : '',
                address: {
                    street: '',
                    number: 0,
                    coordinates: {
                        x: 0,
                        y:0,
                    }
                },

                email: '',
        
        })
        const [ savedCheckedFaithful, setSavedCheckedFaithful ] = useState(false)
        const [ savedAvailableRestaurants, setSavedAvailableRestaurants ] = useState<Local[]>([])
        const [ savedSelectedRestaurants, setSavedSelectedRestaurants ] = useState<Local[]>([])
        const [ saveddisplayAddDialog, setSavedDisplayAddDialog ] = useState(false)
        const [ savedcheckedMarketing, setSavedCheckedMarketing ] = useState(false)
        const [ savedcheckedVegan, setSavedCheckedVegan] = useState(false)
        const [ savedcheckedExquisite, setSavedCheckedExquisite] = useState(false)
        const [ savedcheckedConservative, setSavedCheckedConservative] = useState(false)
        const [ savedcheckedImpatient, setSavedCheckedImpatient] = useState(false)
        const [ savedDistance, setSavedDistance ] = useState<number>(1)


        const handleSaveAll = () => {
        
        setSavedProfileInfo(profileInfo)
        setSavedAvailableRestaurants(availableRestaurants)
        setSavedCheckedFaithful(checkedFaithful)
        setSavedSelectedRestaurants(selectedRestaurants)
        setSavedDistance(distance)
        setSavedDisplayAddDialog(displayAddDialog)
        setSavedCheckedMarketing(checkedMarketing)
        setSavedCheckedVegan(checkedVegan)
        setSavedCheckedExquisite(checkedExquisite)
        setSavedCheckedConservative(checkedConservative)
        setSavedCheckedImpatient(checkedImpatient)
        
    }


        const getRestaurants = async () => {
        
                try{
                const allRestaurants = await localService.getRestaurants()
        
                const initialSelected = allRestaurants.slice(0, 3)
                const initialAvailable = allRestaurants.slice(3) 
        
                setSelectedRestaurants(initialSelected)
                setAvailableRestaurants(initialAvailable)
        
                
                } catch(error : unknown ) {
                    const errorMessage = getMensajeError(error as ErrorResponse)
                    showToast(errorMessage, 'error')
                }
        
        }

        async function fetchProfileInfo()  {
                const username = authService.getLoggedUsername() 
                
                if (username == null) {
                    showToast('Debe iniciar sesión para ver su perfil.', 'error')
                    return
                }
        
                setUsername(username) 
        
                try {
                    const userProfile = await userService.getUserProfile(username) 
                    setProfileInfo(userProfile)
                } catch (error: unknown) {
                    const errorMessage = getMensajeError(error as ErrorResponse)
                    showToast(`Error al cargar perfil: ${errorMessage}`, 'error')
                }
        }
    

        useOnInit(getRestaurants)
        useOnInit(fetchProfileInfo)


        return(<>
        <Outlet context= {{
            handleSaveAll,
            checkedFaithful, setCheckedFaithful, 
            availableRestaurants, setAvailableRestaurants, 
            selectedRestaurants, setSelectedRestaurants, 
            displayAddDialog, setDisplayAddDialog, 
            checkedMarketing, setCheckedMarketing, 
            checkedVegan, setCheckedVegan, 
            checkedExquisite, setCheckedExquisite, 
            checkedConservative, setCheckedConservative,
            checkedImpatient, setCheckedImpatient, 
            distance, setDistance,
            profileInfo, setProfileInfo,
            username, setUsername,
            savedCheckedFaithful,
            savedAvailableRestaurants,
            savedDistance,
            savedSelectedRestaurants,
            saveddisplayAddDialog,
            savedcheckedMarketing,
            savedcheckedVegan,
            savedcheckedImpatient,
            savedcheckedExquisite,
            savedcheckedConservative,
            getRestaurants,
           }}/>
        
        

    
        <div id= "toast-container">
            <Toast toast = { toast } />
        </div>
        
        
        </>
        )

}


