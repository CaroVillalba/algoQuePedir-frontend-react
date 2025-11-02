import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import './ProfileView.css'

export const ProfileView = () => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [address, setAddress] = useState('')
    const [location, setLocation] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')

    return (
        <>
            <h2>Información personal</h2>
            <div className="input-form">
                <label htmlFor="name">Nombre</label>
                <InputText
                    id="name"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    
                />
            </div>

            <div className="input-form">
                <label htmlFor="surname">Apellido</label>
                <InputText
                    id="surname"
                    value={surname}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSurname(e.target.value)}
                    
                />
            </div>
            <div className="input-form">
                <label htmlFor="address">Direccion</label> 
                <InputText
                    id="address"
                    value={address}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                    
                />
            </div>
            <div className="input-form">
                <label htmlFor="location">Ubicación</label> 
                <InputText
                    id="location"
                    value={location}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
                    
                />
            </div>
            <div className="input-form-row">
                <div className="input-form">
                    <label htmlFor="latitude">Latitud</label>
                    <InputText
                        id="latitude"
                        value={latitude}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLatitude(e.target.value)}
                    />
                </div>

                <div className="input-form">
                    <label htmlFor="longitude">Longitud</label>
                    <InputText
                        id="longitude"
                        value={longitude}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLongitude(e.target.value)}
                    />
                </div>
            </div>

            <h2>Preferencias</h2>
            








        </>
    )
}