import '../SearchCriteria/SearchCriteria.css'
import { Card } from 'primereact/card'
import { useState } from 'react'
import { Checkbox } from 'primereact/checkbox'



export const MarketingCriteria = () => {

    const [ checkedMarketing, setCheckedMarketing ] = useState(false)
    
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