import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Card } from  'primereact/card'
import { ChevronRightIcon } from 'primereact/icons/chevronright'
import './ProfileView.css'
import { useNavigate } from 'react-router-dom'
import type { User } from '../../../types/User'
import { userService } from '../../../services/UserService'
import { Toast } from '../../../components/common/toast'
import { useToast } from '../../../hooks/useToast'
import { useOnInit } from '../../../hooks/useOnInit'
import { getMensajeError, type ErrorResponse } from '../../../utils/errorHandling'
import type { FormEvent } from 'react'

export const ProfileView = () => {
    const navigate = useNavigate()
    const { toast, showToast } = useToast()

    const [profileInfo, setProfileInfo ]= useState<User>({
        id : -1,
        name : '',
        surname : '',
        address : '',
        location : '',
        longitude : 0,
        latitude : 0,

    })


    async function handlePersonalInfo(e : FormEvent ){
        e.preventDefault()
        
        try {
            await userService.createProfile( profileInfo )

        } catch ( error: unknown ){
            const errorMessage = getMensajeError( error as ErrorResponse )
            showToast( errorMessage, 'error' )
        }

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    
    setProfileInfo(prevInfo => ({
        ...prevInfo, 
        [id]: value, 
    }))
    }   



    return (
        <>
        <section>

            <header>
            <h2>Información personal</h2>
            </header>

            <form action= "#" method="post">
            <section>
            <div className="input-form">
                <label htmlFor="name">Nombre</label>
                <InputText
                    id="name"
                    required={true}
                    value={profileInfo.name}
                    onChange={handleChange}
                    
                />
            </div>

            <div className="input-form">
                <label htmlFor="surname">Apellido</label>
                <InputText
                    id="surname"
                    required={true}
                    value={profileInfo.surname}
                    onChange={handleChange}
                    
                />
            </div>
            <div className="input-form">
                <label htmlFor="address">Direccion</label> 
                <InputText
                    id="address"
                    required={true}
                    value={profileInfo.address}
                    onChange={handleChange}
                    
                />
            </div>
            <div className="input-form">
                <label htmlFor="location">Ubicación</label> 
                <InputText
                    id="location"
                    required={true}
                    value={profileInfo.location}
                    onChange={handleChange}
                    
                />
            </div>
            <div className="input-form-row">
                <div className="input-form">
                    <label htmlFor="latitude">Latitud</label>
                    <InputText
                        id="latitude"
                        keyfilter={'num'}
                        required={true}
                        value={profileInfo.latitude.toString()}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-form">
                    <label htmlFor="longitude">Longitud</label>
                    <InputText
                        id="longitude"
                        keyfilter={'num'}
                        required={true}
                        value={profileInfo.longitude.toString()}
                        onChange={handleChange}
                    />
                </div>
            </div>
            </section>

            <section>
            <header>
            <h2>Preferencias</h2>
            </header>

            <div onClick={() => navigate('./criteria')} className="preference-button">
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
            </section>

            <Button label="Guardar" className='button-primary' type='submit' onClick={handlePersonalInfo}
            />

        </form>
        </section>
        

        <div id ="toast-container">
            <Toast toast = {toast} />
        </div>

        </>
    )
}