import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Card } from  'primereact/card'
import { ChevronRightIcon } from 'primereact/icons/chevronright'
import './ProfileView.css'

export const ProfileView = () => {
    const [name, setName] = useState<string>('')
    const [surname, setSurname] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const [latitude, setLatitude] = useState<string>('')
    const [longitude, setLongitude] = useState<string>('')

    return (
        <>
            
            <h2>Información personal</h2>
            <div className="input-form">
                <label htmlFor="name">Nombre</label>
                <InputText
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    
                />
            </div>

            <div className="input-form">
                <label htmlFor="surname">Apellido</label>
                <InputText
                    id="surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    
                />
            </div>
            <div className="input-form">
                <label htmlFor="address">Direccion</label> 
                <InputText
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    
                />
            </div>
            <div className="input-form">
                <label htmlFor="location">Ubicación</label> 
                <InputText
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    
                />
            </div>
            <div className="input-form-row">
                <div className="input-form">
                    <label htmlFor="latitude">Latitud</label>
                    <InputText
                        id="latitude"
                        keyfilter={'int'}
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                    />
                </div>

                <div className="input-form">
                    <label htmlFor="longitude">Longitud</label>
                    <InputText
                        id="longitude"
                        keyfilter={'int'}
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                    />
                </div>
            </div>

           <h2>Preferencias</h2>
           <div onClick={()=>console.log('click')} className="preference-button">
                <h4>Criterios de busqueda</h4>
                <ChevronRightIcon/>
           </div>

           <div onClick={()=>console.log('click')} className="preference-button">
                <h4>Ingredientes preferidos</h4>
                <ChevronRightIcon/>
           </div>

           <div onClick={()=>console.log('click')} className="preference-button">
                <h4>Ingredientes a evitar</h4>
                <ChevronRightIcon/>
           </div>

           <Button label="Guardar" className='button-primary' ></Button>



            

            
            








        </>
    )
}