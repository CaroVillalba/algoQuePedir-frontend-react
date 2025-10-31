import React, { useState } from "react"
import { InputText } from "primereact/inputtext"

export const ProfileView = () => {
    const [name, setName] = useState("")

    return (
        <div>
            <label>Nombre</label>
            <InputText
                id="name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                placeholder="hola"
            />
        </div>
    )
}