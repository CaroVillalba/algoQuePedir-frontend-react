import { Button, TextareaAutosize } from "@mui/material"
import "./ReviewRestorantView.css"
import { useState } from "react";

export const ReviewRestorantView = () => {
    const [stars, setStars] = useState("1");

    const handleChangeStars = (e:any) => setStars(e.target.value)

    return (
        <div className="ReviewRestorantView">
            <h1>¿Como fue tu experiencia en El Sabor?</h1>

            <form className="starContainer">
                {
                ["1","2","3","4","5"].map((v) => (
                    <label className="star">
                        <input type="radio" name="stars" value={v} checked={stars === v} onChange={handleChangeStars}/>
                        <svg viewBox="0 0 24 24" className="star-icon" aria-hidden="true">
                            <path d="M12 .587l3.668 7.431L23.4 9.75l-5.7 5.556L18.8 24 12 20.01 5.2 24l1.1-8.694L.6 9.75l7.732-1.732L12 .587z"/>
                        </svg>
                        <span>{v}</span>
                    </label>
                ))
                }
            </form>

            <br/>

            <TextareaAutosize minRows={5} placeholder="Contanos tu experiencia"/>

            <Button className='button-primary' type='submit'>Enviar</Button>
        </div>
    )
}

//<i className="pi pi-star"/>