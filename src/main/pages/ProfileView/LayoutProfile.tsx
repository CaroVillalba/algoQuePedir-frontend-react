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
        const [ availableRestaurants, setAvailableRestaurants ] = useState<Local[]>([])
        const [ selectedRestaurants, setSelectedRestaurants ] = useState<Local[]>([])
        const [ displayAddDialog, setDisplayAddDialog ] = useState(false)
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

        const [criteria, setCriteria] = useState({
            faithful: false,
            marketing: false,
            vegan: false,
            exquisite: false,
            conservative: false,
            impatient: false,
        })

        const [ username, setUsername ] = useState('username')


        const [ avoidIngredients, setAvoidIngredients ] = useState<string[]>([])
        const [ preferredIngredients, setPreferredIngredients ] = useState<string[]>([])

        const profileContext = {
            profileInfo, setProfileInfo,
            username, setUsername,
        }

        const criteriaContext = {
            criteria, setCriteria,
            distance, setDistance,
        }

        const restaurantContext = {
            availableRestaurants, setAvailableRestaurants,
            selectedRestaurants, setSelectedRestaurants,
            displayAddDialog, setDisplayAddDialog,
        }

        const ingredientContext = {
            avoidIngredients, setAvoidIngredients,
            preferredIngredients, setPreferredIngredients,
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
            profile: profileContext,
            criteria: criteriaContext,
            restaurant: restaurantContext,
            ingredients: ingredientContext,
            showToast,

        }}/>
        
        
        <div id= "toast-container">
            <Toast toast = { toast } />
        </div>
        
        </>
        )

}


