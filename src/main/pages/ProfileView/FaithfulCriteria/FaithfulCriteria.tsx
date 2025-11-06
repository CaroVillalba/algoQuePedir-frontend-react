import React from 'react'
import { useState } from 'react'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import './FaithfulCriteria.css'
import { DataView } from 'primereact/dataview'
//import { RestaurantsService } from './services/RestaurantsService'

export const FaithfulCriteria = () => {

    const [ checkedFaithful, setCheckedFaithful ] = useState(false)
    const [restaurants, setRestaurants] = useState([
    { id: 1, nombre: 'El Ferroviario', direccion: 'Av. San Martín 1234', imagen: '/temp-images/asado.png' },
    { id: 2, nombre: 'Restorán La Canchita', direccion: 'Belgrano 456', imagen: '/temp-images/milanesa.png' },])

    //const [ restaurants , setRestaurants ] = useState([]);
    /* 
        useEffect(() => {
            RestaurantsService.getRestaurants.then((data => setRestaurant(data)))
        }

  */
    


    return (
        <>
        
        <Card className='card'>
            <div className='card-text'>
                <span className='title' > Fieles </span>
                <span className='subtitle'> Solo los restaurantes preferidos </span>

            </div>
        <Checkbox className='custom-checkbox' onChange={e => setCheckedFaithful(e.checked ?? false)} checked={checkedFaithful}></Checkbox>


        </Card>
        
        </>
    )

}



