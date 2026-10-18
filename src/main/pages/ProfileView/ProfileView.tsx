import React, { useEffect, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Card } from  'primereact/card'
import { ChevronRightIcon } from 'primereact/icons/chevronright'
import './ProfileView.css'

type ProfileForm = {
    name: string;
    surname: string;
    address: string;
    location: string;
    latitude: string;
    longitude: string;
}

const initialState = {
        name: '',
        surname: '',
        address: '',
        location: '',
        latitude: '',
        longitude: ''
    }

export const ProfileView = () => {
    const [profileForm, setProfileForm] = useState<ProfileForm>(initialState)

    // keyof typeof profileForm es igual a
    // type profileFormKeys = 'name' | 'surname' | 'address' | 'location' | 'latitude'...etc
    const actualizarCampo = (referencia: keyof typeof profileForm, valor: unknown) =>{
        setProfileForm({
            ...profileForm,
            [referencia]:valor
        })
    }

/*     const [name, setName] = useState<string>('')
    const [surname, setSurname] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const [latitude, setLatitude] = useState<string>('')
    const [longitude, setLongitude] = useState<string>('') */

    //OnMount
    useEffect(() => {
        console.log('Me monté',profileForm)

        const intervalId = setInterval( () => {
            actualizarCampo('name','Agustin')
        },1000)
        return () => {console.log('Me desmonté')
            clearInterval(intervalId)
        }
    },[])

    const handleSave = () => {
        console.log(profileForm)
    }

    return (
        <>

            <h2>Información personal</h2>
            <div className="input-form">
                <label htmlFor="name">Nombre</label>
                <InputText
                    id="name"
                    value={profileForm.name}
                    onChange={e => actualizarCampo('name',e.target.value)}

                />
            </div>

            <div className="input-form">
                <label htmlFor="surname">Apellido</label>
                <InputText
                    id="surname"
                    value={profileForm.surname}
                    onChange={e => setProfileForm({
                                ...profileForm,
                                ['surname']:e.target.value
                            })}

                />
            </div>

            <div className="input-form">
                <label htmlFor="address">Direccion</label>
                <InputText
                    id="address"
                    value={profileForm.address}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => actualizarCampo('name',e.target.value)}

                />
            </div>

            <div className="input-form">
                <label htmlFor="location">Ubicación</label>
                <InputText
                    id="location"
                    value={profileForm.location}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => actualizarCampo('location',e.target.value)}
                />
            </div>

            <div className="input-form-row">
                <div className="input-form">
                    <label htmlFor="latitude">Latitud</label>
                    <InputText
                        id="latitude"
                        keyfilter={'int'}
                        value={profileForm.latitude}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => actualizarCampo('latitude',e.target.value)}
                    />
                </div>

                <div className="input-form">
                    <label htmlFor="longitude">Longitud</label>
                    <InputText
                        id="longitude"
                        keyfilter={'int'}
                        value={profileForm.longitude}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => actualizarCampo('name',e.target.value)}
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

           <Button onClick={handleSave} label="Guardar" className='button-primary' ></Button>

        </>
    )
}