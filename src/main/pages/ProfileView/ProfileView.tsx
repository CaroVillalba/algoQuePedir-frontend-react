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
import '../../../toast.css'

export const ProfileView = () => {
    const navigate = useNavigate()
    const { toast, showToast } = useToast()

    const [profileInfo, setProfileInfo ]= useState<User>({
        id : -1,
        name : '',
        surname : '',
        location : '',
        address: {
            street: '',
            number: 0,
            coordinates: {
                x: 0,
                y:0,
            }
        }

    })


    async function handlePersonalInfo(e : FormEvent){
        e.preventDefault()
        
        if(!validateName()){
            showToast('El nombre es obligatorio', 'error')
            return
        }

        if(!validateSurname()){
            showToast('El apellido es obligatorio', 'error')
            return
        }

        if(!validateAddress()){
            showToast('La direccion es obligatoria', 'error')
            return
        }

        if(!validateLocation()){
            showToast('La ubicacion es obligatoria', 'error')
            return
        }

        if(!validateLatitude()){
            showToast('Latitud invalida. Debe estar entre -90 y 90', 'error')
            return
        }

        if(!validateLongitude()){
            showToast('Longitud invalida. Debe estar entre -180 y 180', 'error')
            return 
        }
        
        try {
            await userService.createProfile( profileInfo )
            showToast('Perfil guardado correctamente', 'success')

        } catch ( error: unknown ){
            const errorMessage = getMensajeError( error as ErrorResponse )
            showToast( errorMessage, 'error' )
        }

    }


    function validateName() : boolean{
        return profileInfo.name != ''
    }

    function validateSurname() : boolean{
        return profileInfo.surname != ''
    }

    function validateAddress() : boolean{
        return profileInfo.address.street != ''
    }

    function validateLocation() : boolean{
        return profileInfo.location != ''
    }

    function validateLongitude() : boolean{
        const lon = profileInfo.address.coordinates.x
        return (lon >= -180 && lon <= 180) && lon != 0
    }

    function validateLatitude() : boolean {
        const lat = profileInfo.address.coordinates.y
        return (lat >= -90 && lat <= 90) && lat != 0
    }



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    
    setProfileInfo(prevInfo => {
            if (['name', 'surname', 'location'].includes(id)) {
                return { ...prevInfo, [id]: value }
            }

            if (['latitude', 'longitude'].includes(id)) {
                
                const coordKey = id === 'latitude' ? 'y' : 'x'
                const numValue = parseFloat(value) || 0 
                
                return {
                    ...prevInfo,
                    address: {
                        ...prevInfo.address,
                        coordinates: {
                            ...prevInfo.address.coordinates,
                            [coordKey]: numValue,
                        }
                    }
                }
            }

            if (id === 'street') {
                return {
                    ...prevInfo,
                    address: {
                        ...prevInfo.address,
                        street: value,
                    }
                }
            }

            if (id === 'number') {
                const numValue = parseInt(value) || 0
                return {
                    ...prevInfo,
                    address: {
                        ...prevInfo.address,
                        number: numValue,
                    }
                }
            }

            return prevInfo
        })
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
                <label htmlFor="address">Calle</label> 
                <InputText
                    id="street"
                    required={true}
                    value={profileInfo.address.street}
                    onChange={handleChange}
                    
                />
            </div>
            <div className="input-form">
                <label htmlFor="number">Número</label> 
                <InputText
                    id="number"
                    required={true}
                    keyfilter={'num'}
                    value={profileInfo.address.number.toString()}
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
                        value={profileInfo.address.coordinates.y.toString()}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-form">
                    <label htmlFor="longitude">Longitud</label>
                    <InputText
                        id="longitude"
                        keyfilter={'num'}
                        required={true}
                        value={profileInfo.address.coordinates.x.toString()}
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