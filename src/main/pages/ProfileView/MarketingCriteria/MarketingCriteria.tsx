import '../SearchCriteria/SearchCriteria.css'
import { Card } from 'primereact/card'
import { useState } from 'react'
import { Checkbox } from 'primereact/checkbox'
import { useOutletContext } from 'react-router-dom'
import type { ProfileContextType } from '../../../../types/ProfileContextType'



export const MarketingCriteria = () => {
    
    const { checkedMarketing, setCheckedMarketing } = useOutletContext<ProfileContextType>()
    
    return (
        <>
        <Card className='criteria-card'>
        <section className='card-text'>
            <div className='header-row'>
                <div className='card-text-header'>
                    <span className='title'>Marketing</span>
                    <span className='subtitle'>Filtran platos por palabras buscadas</span>
                </div>
                <Checkbox 
                    className='custom-checkbox' 
                    onChange={e => setCheckedMarketing(e.checked ?? false)} 
                    checked={checkedMarketing}
                />
            </div>
        </section>
        </Card>
        
        
        </>
    )


}