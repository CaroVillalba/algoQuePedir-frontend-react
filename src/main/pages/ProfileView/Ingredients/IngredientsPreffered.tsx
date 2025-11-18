import React, { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { Button } from 'primereact/button'
import { ChevronLeftIcon } from 'primereact/icons/chevronleft'
import type { ProfileContextType } from '../../../../types/ProfileContextType'
import { AddIngredientDialog } from './AddIngredientDialog' 
import { useToast } from '../../../../hooks/useToast'
import { DataView } from 'primereact/dataview'


export const IngredientsPreffered = () => {

    const { 
        preferredIngredients, setPreferredIngredients,
        avoidIngredients, 

    } = useOutletContext<ProfileContextType>()

    const { toast, showToast } = useToast()

    const [dialogVisible, setDialogVisible] = useState(false)

    const handleRemoveIngredient = (ingredientToRemove: string) => {
        setPreferredIngredients(prevList => prevList.filter(ing => ing !== ingredientToRemove))
    }

    const handleAddIngredient = (newIngredient: string) => {
        const normalizedNewIngredient = newIngredient.toLowerCase()
        
        
        if (preferredIngredients.map(i => i.toLowerCase()).includes(normalizedNewIngredient)) {
            showToast('El ingrediente ya existe en la lista de "preferidos"', 'warning')
            return
        }
        
        if (avoidIngredients.map(i => i.toLowerCase()).includes(normalizedNewIngredient)) {
            showToast(`"${newIngredient}" no puede estar en la lista de a evitar y preferidos a la vez.`, 'error')
            return
        }

        setPreferredIngredients(prevList => [...prevList, newIngredient])
        setDialogVisible(false)
    }

    const ingredientItemTemplate = (ingredient: string) => {
        return (
            <div className="p-col-12">
                <div 
                    className="p-d-flex p-jc-between p-ai-center ingredient-data-row p-card p-p-2 p-mb-2"
                >
                    <div className="ingredient-name">{ingredient}</div>
                    
                    <Button 
                        icon="pi pi-times" 
                        className="p-button-danger p-button-text p-button-rounded" 
                        onClick={() => handleRemoveIngredient(ingredient)} 
                    />
                </div>
            </div>
        )
    }

   

    return (
        <>
            <DataView
                value={preferredIngredients}
                layout="list" 
                itemTemplate={ingredientItemTemplate}
                paginator={false} 
                emptyMessage="No hay ingredientes en esta lista."
             />

            <Button 
                label="Añadir ingrediente" 
                icon="pi pi-plus" 
                className="p-button-primary p-mt-5" 
                onClick={() => setDialogVisible(true)} 
            />

            <AddIngredientDialog
                visible={dialogVisible}
                onHide={() => setDialogVisible(false)}
                onAdd={handleAddIngredient}
                title="Añadir ingrediente preferido"
            />
        </>
    )
}