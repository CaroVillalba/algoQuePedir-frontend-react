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
import { Avatar } from 'primereact/avatar'
import '../../../toast.css'
import { authService } from '../../../services/AuthService'

export const ProfileView = () => {
    const navigate = useNavigate()
    const { toast, showToast } = useToast()
    
    const [username, setUsername] = useState('username')
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
        }

    })

    const fetchProfileInfo = async () => {
        const username = authService.getLoggedUsername() 
        
        if (!username) {
            showToast('Debe iniciar sesión para ver su perfil.', 'error')
            navigate('/login') 
            return
        }

        setUsername(username) 

        try {
            const userProfile = await userService.getUserProfile(username) 
            console.log('Respuesta del backend:', userProfile)
            setProfileInfo(userProfile)
        } catch (error: unknown) {
            const errorMessage = getMensajeError(error as ErrorResponse)
            showToast(`Error al cargar perfil: ${errorMessage}`, 'error')
        }
    }

    async function handlePersonalInfo(e: FormEvent) {
        e.preventDefault()
    }

    useOnInit(fetchProfileInfo)

/*
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
*/


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    
    setProfileInfo(prevInfo => {
            if (['firstname', 'lastname', 'location'].includes(id)) {
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
            <section className='profile-header'>
                <Avatar className='profile-avatar' icon= "pi pi-user" size='xlarge' shape='circle' style={{ backgroundColor: '#ffffff' }}></Avatar>
                <span className='title'>User</span>
                <span className='subtitle'>user@email.com</span> 
            </section>
            <h2>Información personal</h2>
            </header>

            <form action= "#" method="post">
            <section>
            <div className="input-form">
                <label htmlFor="firstname">Nombre</label>
                <InputText
                    id="firstname"
                    required={true}
                    value={profileInfo.firstname ?? ''}
                    onChange={handleChange}
                    
                />
            </div>

            <div className="input-form">
                <label htmlFor="surname">Apellido</label>
                <InputText
                    id="lastname"
                    required={true}
                    value={profileInfo.lastname ?? ''}
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