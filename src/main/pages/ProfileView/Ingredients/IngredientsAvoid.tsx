import React, { useState, type ReactElement } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { Tag } from 'primereact/tag'
import { Button } from 'primereact/button'
import { ChevronLeftIcon } from 'primereact/icons/chevronleft' 
import type { ProfileContextType } from '../../../../types/ProfileContextType'
import { AddIngredientDialog } from './AddIngredientDialog' 
import { useToast } from '../../../../hooks/useToast'
import { DataView } from 'primereact/dataview'
import type { MainContextType } from '../../../../types/MainContextType'
import './Ingredients.css'


export const IngredientsAvoid = () => {
    const navigate = useNavigate()
    
    const { 
        ingredients, showToast
    } = useOutletContext<ProfileContextType>()


    const { avoidIngredients, setAvoidIngredients, preferredIngredients } = ingredients


    const [dialogVisible, setDialogVisible] = useState(false)

    const handleRemoveIngredient = (ingredientToRemove: string) => {
        setAvoidIngredients(prevList => prevList.filter(ing => ing !== ingredientToRemove))
    }

    const handleAddIngredient = (newIngredient: string) => {
        const normalizedNewIngredient = newIngredient.toLowerCase()

       
        if (avoidIngredients.map(i => i.toLowerCase()).includes(normalizedNewIngredient)) {
            showToast('El ingrediente ya existe en la lista de "a evitar"', 'warn')
            return
        }
        
        if (preferredIngredients.map(i => i.toLowerCase()).includes(normalizedNewIngredient)) {
            showToast(`"${newIngredient}" no puede estar en la lista de preferidos y a evitar a la vez.`, 'error')
            return
        }

        setAvoidIngredients(prevList => [...prevList, newIngredient])
        setDialogVisible(false) 
    }

    const ingredientItemTemplate = (ingredient: string): ReactElement => { 
        return (
            <div className="p-col-12">
                <div 
                    className="ingredient-data-row p-card p-p-2 p-mb-2 "
                >
                    <div className="ingredient-name">{ingredient}</div>
                    <Button 
                        icon="pi pi-times" 
                        className="p-button-danger p-button-text p-button-rounded ingredient-remove-button" 
                        onClick={() => handleRemoveIngredient(ingredient)} 
                    />
                </div>
            </div>
        )
    }

    return (
        <>
            <section className='ingredient-list-row'>
            <DataView 
                className='ingredient-list'
                value={avoidIngredients}
                layout="list" 
                itemTemplate={ingredientItemTemplate}
                paginator={false} 
                emptyMessage="No hay ingredientes en esta lista."
            />
            </section>
            <Button 
                label="Añadir ingrediente" 
                icon="pi pi-plus" 
                className='button-primary button-ingredients' 
                onClick={() => setDialogVisible(true)} 
            />
           
            <AddIngredientDialog
                visible={dialogVisible}
                onHide={() => setDialogVisible(false)}
                onAdd={handleAddIngredient}
                title="Añadir ingrediente a evitar"
            />
    </>
    )
}