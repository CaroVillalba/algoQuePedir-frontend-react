import { useState } from 'react'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import './FaithfulCriteria.css'
import { DataView } from 'primereact/dataview'
import { localService } from '../../../../services/LocalService'
import type { Local } from '../../../../types/Local'
import { getMensajeError, type ErrorResponse } from '../../../../utils/errorHandling'
import { Toast } from '../../../../components/common/toast'
import { useToast } from '../../../../hooks/useToast'
import { useOnInit } from '../../../../hooks/useOnInit'
import { Dialog } from 'primereact/dialog'
import { PickList } from 'primereact/picklist'
import '../../../../toast.css'
import { useOutlet, useOutletContext } from 'react-router-dom'
import type { ProfileContextType } from '../../../../types/ProfileContextType'

export const FaithfulCriteria = () => {

    const { criteria, restaurant, showToast } = useOutletContext<ProfileContextType>()

    const { criteria: c , setCriteria } = criteria

    const { availableRestaurants, setAvailableRestaurants, selectedRestaurants,
            setSelectedRestaurants, displayAddDialog, setDisplayAddDialog  } = restaurant
    


    const onChangePickList = (event: { source: Local[], target: Local[] }) => {
        setAvailableRestaurants(event.source)
        setSelectedRestaurants(event.target)
    }


    const pickListItemTemplate = (restaurant: Local) => {
        return (
            <div className="flex align-items-center p-2">
                <img src={restaurant.imgURL} alt={restaurant.name} className="w-3rem h-3rem shadow-2 flex-shrink-0 mr-3" />
                <div className="flex-1">
                    <div className="font-bold">{restaurant.name}</div>
                    <div>{restaurant.rating} • {restaurant.deliveryDelay} • ${restaurant.appCommission}</div>
                </div>
            </div>
        )
    }


    const itemTemplate = (restaurant: Local) => {
        return (
            <div className="restaurant-item" key={restaurant.id}>
                <img src={restaurant.imgURL} alt={restaurant.name} className="restaurant-image" />
                <div className="restaurant-details">
                    <span className="restaurant-name">{restaurant.name}</span>
                    <div className="restaurant-info">
                        <span>{restaurant.rating} • {restaurant.deliveryDelay} • ${restaurant.appCommission}</span>
                    </div>
                </div>
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
                    onChange={() =>
                        setCriteria(prev => ({
                            ...prev,
                            faithful: !prev.faithful
                        }))
                    }
                    checked={c.faithful}
                />
            </Card>

            <DataView 
                value={selectedRestaurants} 
                listTemplate={listTemplate}
                layout='list'
                className='restaurants-dataview'
            />

            <div className='add-button-container'>
                <Button 
                    icon="pi pi-plus" 
                    className="p-button-rounded p-button-danger add-button"
                    onClick={() => setDisplayAddDialog(true)}
                />
            </div>
        </div>

        <Dialog 
                header="Agregar Restaurantes Preferidos" 
                visible={displayAddDialog} 
                onHide={() => setDisplayAddDialog(false)} 
                modal 
                style={{ width: '80%' , height: '100%'}}
                
            >
                <div className="p-fluid">
                    <PickList
                        dataKey="id"
                        source={availableRestaurants} 
                        target={selectedRestaurants} 
                        itemTemplate={pickListItemTemplate} 
                        sourceHeader="Disponibles" 
                        targetHeader="Preferidos" 
                        onChange={onChangePickList} 
                        sourceStyle={{ height: '90px'}} 
                        targetStyle={{ height: '90px' }} 
                        
                    />
                </div>
            </Dialog>

        </>
    )

}



