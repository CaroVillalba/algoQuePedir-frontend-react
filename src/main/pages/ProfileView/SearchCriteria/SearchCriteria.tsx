import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Card } from  'primereact/card'
import './SearchCriteria.css'
import { Checkbox } from 'primereact/checkbox'
import { FaithfulCriteria } from '../FaithfulCriteria/FaithfulCriteria'

export const SearchCriteria = () => {
    const [checkedVegan, setCheckedVegan] = useState(false)
    const [checkedExquisite, setCheckedExquisite] = useState(false)
    const [checkedConservative, setCheckedConservative] = useState(false)
    const [checkedImpatient, setCheckedImpatient] = useState(false)

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

                <Card className='criteria-card'>
                    <div className='card-text'>
                    <span className='title'>Impacientes</span>
                    <span className='subtitle'>Dentro de una distancia máxima</span>
                    </div>
                <Checkbox className='custom-checkbox' onChange={e => setCheckedImpatient(e.checked ?? false)} checked = {checkedImpatient}></Checkbox>

                </Card>


            </section>
        
        </>
    )

}