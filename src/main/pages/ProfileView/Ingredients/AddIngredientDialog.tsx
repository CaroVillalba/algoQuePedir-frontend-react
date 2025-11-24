import React, { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

interface AddIngredientDialogProps {
    visible: boolean;
    onHide: () => void;
    onAdd: (ingredient: string) => void;
    title: string;
}

export const AddIngredientDialog: React.FC<AddIngredientDialogProps> = ({ visible, onHide, onAdd, title }) => {
    const [ingredientName, setIngredientName] = useState('')

    const handleAdd = () => {
        if (ingredientName.trim()) {
            onAdd(ingredientName.trim())
            setIngredientName('') 
        }
    }

    const dialogFooter = (
            <Button label="Añadir" icon="pi pi-check" onClick={handleAdd} autoFocus />
    )

    return (
        <Dialog 
            header={title} 
            visible={visible} 
            style={{ width: '90vw', maxWidth: '400px' }} 
            modal 
            onHide={onHide}
            footer={dialogFooter}
        >
            <div className="p-fluid">
                <span className="p-float-label">
                    <InputText 
                        id="ingredientName" 
                        value={ingredientName} 
                        onChange={(e) => setIngredientName(e.target.value)} 
                    />
                    <label htmlFor="ingredientName">Nombre del ingrediente</label>
                </span>
            </div>
        </Dialog>
    )
}