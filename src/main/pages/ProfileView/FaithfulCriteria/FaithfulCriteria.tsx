import React from 'react'
import { useState } from 'react'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import './FaithfulCriteria.css'
import { DataView } from 'primereact/dataview'
import { localService } from '../../../../services/LocalService'
import { useEffect } from 'react'
import type { Local } from '../../../../types/Local'


export const FaithfulCriteria = () => {
    const [ checkedFaithful, setCheckedFaithful ] = useState(false)
    const [ restaurants , setRestaurants ] = useState<Local[]>([])


    const getRestaurants = async () => {

        try{
        const newRestaurants = await localService.getRestaurants()
        setRestaurants(newRestaurants)
        } catch(error) {
            console.error('Error fetching restaurants', error)
        }

    }

    useEffect(() => {
        getRestaurants()
    }, [])
    
    const itemTemplate = (restaurant: Local) => {
        return (
            <div className="restaurant-item" key={restaurant.id}>
                <img src={restaurant.imgUrl} alt={restaurant.name} className="restaurant-image" />
                <div className="restaurant-details">
                    <span className="restaurant-name">{restaurant.name}</span>
                    <div className="restaurant-info">
                        <span>{restaurant.rating} • {restaurant.deliveryDelay} • ${restaurant.appCommission}</span>
                    </div>
                </div>
        
                <Button 
                    icon="pi pi-times" 
                    className="p-button-rounded p-button-text p-button-danger remove-button"
                    onClick={() => console.log(`Remover ${restaurant.name}`)} 
                />
            </div>
        )
    }

    const listTemplate = ( items : Local[] ) => {
        if( !items || items.length === 0) return null

        let list = items.map((restaurants) => {
            return itemTemplate(restaurants)
        })

        return <div className='restaurants-dataview grid grid-nogutter'>{list}</div>
    }
  
    
    return (
        <>

        <div className='faithful-criteria-container'>
            <Card className='criteria-card p-shadow-2'> 
                <div className='card-text'>
                    <span className='title'>Fieles</span>
                    <span className='subtitle'>Solo los restaurantes preferidos</span>
                </div>
                <Checkbox 
                    className='custom-checkbox' 
                    onChange={e => setCheckedFaithful(e.checked ?? false)} 
                    checked={checkedFaithful}
                />
            </Card>

            <DataView 
                value={restaurants} 
                listTemplate={listTemplate}
                layout='list'
                className='restaurants-dataview'
            />

            <div className='add-button-container'>
                <Button 
                    icon="pi pi-plus" 
                    className="p-button-rounded p-button-danger add-button"
                    onClick={() => console.log('Agregar restaurante')}
                />
            </div>
        </div>

        </>
    )

}



