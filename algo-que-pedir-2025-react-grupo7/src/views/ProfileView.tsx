import React, { useState } from "react"
import { InputText } from "primereact/inputtext"

export const ProfileView = () => {
    const [name, setName] = useState("")

    return (
        <div className="p-4">
            <label htmlFor="name" className="block mb-2">Nombre</label>
            <InputText
                id="name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                placeholder="hola"
            />
        </div>
    )
}