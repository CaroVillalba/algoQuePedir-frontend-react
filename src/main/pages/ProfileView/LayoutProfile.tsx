import { useState } from 'react'
import type { Local } from '../../../types/Local'
import { useToast } from '../../../hooks/useToast'
import { Outlet } from 'react-router-dom'
import { Toast } from '../../../components/common/toast'
import '../../../toast.css'
import { getMensajeError, type ErrorResponse } from '../../../utils/errorHandling'
import { localService } from '../../../services/LocalService'
import { useOnInit } from '../../../hooks/useOnInit'


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
        
        useOnInit(getRestaurants)


        return(<>
        <Outlet context= {{  checkedFaithful, setCheckedFaithful, availableRestaurants, setAvailableRestaurants, selectedRestaurants, setSelectedRestaurants, displayAddDialog,
            setDisplayAddDialog, checkedMarketing, setCheckedMarketing, checkedVegan, setCheckedVegan, checkedExquisite, setCheckedExquisite, checkedConservative, setCheckedConservative,
            checkedImpatient, setCheckedImpatient, distance, setDistance, getRestaurants
           }}/>
        
        

    
        <div id= "toast-container">
            <Toast toast = { toast } />
        </div>
        
        
        </>
        )

}


