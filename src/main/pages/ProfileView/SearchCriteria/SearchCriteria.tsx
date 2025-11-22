import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Card } from  'primereact/card'
import './SearchCriteria.css'
import { Checkbox } from 'primereact/checkbox'
import { FaithfulCriteria } from '../FaithfulCriteria/FaithfulCriteria'
import { MarketingCriteria } from '../MarketingCriteria/MarketingCriteria'
import { InputNumber, type InputNumberValueChangeEvent } from 'primereact/inputnumber'
import { useOutletContext } from 'react-router-dom'
import type { ProfileContextType } from '../../../../types/ProfileContextType'

export const SearchCriteria = () => {
    const { criteria, showToast } = useOutletContext<ProfileContextType>()
    
    const { checkedVegan, setCheckedVegan, checkedExquisite, setCheckedExquisite, checkedConservative, setCheckedConservative, checkedImpatient, setCheckedImpatient,
         distance, setDistance } = criteria
    

    return (
        <>
        
            <section className='criteria-list'>
                <Card className='criteria-card'>
                    <div className='card-text'>
                    <span className='title'>Veganos</span>
                    <span className='subtitle'>Solo platos veganos</span>
                    </div>
                <Checkbox className='custom-checkbox' onChange={e => setCheckedVegan(e.checked ?? false)} checked={checkedVegan}></Checkbox>
                </Card>
                
           
                 <Card className='criteria-card'>
                    <div className='card-text'>
                    <span className='title'>Exquisitos</span>
                    <span className='subtitle'>Solo platos de autor</span>
                    </div>
                <Checkbox className='custom-checkbox' onChange={e => setCheckedExquisite(e.checked ?? false)} checked={checkedExquisite}></Checkbox>
                </Card>

                <Card className='criteria-card'>
                    <div className='card-text'>
                    <span className='title'>Conservadores</span>
                    <span className='subtitle'>Solo platos con ingredientes preferidos</span>
                    </div>
                <Checkbox className='custom-checkbox' onChange={e => setCheckedConservative(e.checked ?? false)} checked={checkedConservative}></Checkbox>
                </Card>

                <FaithfulCriteria></FaithfulCriteria>
                <MarketingCriteria></MarketingCriteria>

                
                <Card className='criteria-card'>
                    <div className='card-text'>
                        <div className='header-row'>
                            <div className='card-text-header'>
                                <span className='title'>Impacientes</span>
                                <span className='subtitle'>Dentro de una distancia máxima</span>
                            </div>
                            <Checkbox 
                                className='custom-checkbox impatient-checkbox' 
                                onChange={e => setCheckedImpatient(e.checked ?? false)} 
                                checked={checkedImpatient}
                            />
                        </div>
                        <section className='sub-subtitle distance-row'>
                            <span>Distancia(Kms)</span>
                            <InputNumber 
                            inputId='Impatient' 
                            value={distance} 
                            onValueChange={(e: InputNumberValueChangeEvent) => setDistance(e.value ?? 0)} 
                            showButtons
                            buttonLayout='horizontal'
                            min={1}
                            max={5}
                            disabled={!checkedImpatient}
                            incrementButtonIcon='pi pi-plus'
                            decrementButtonIcon='pi pi-minus'
                            />
                        </section>
                    </div>
                </Card>

            </section>
        
        </>
    )

}