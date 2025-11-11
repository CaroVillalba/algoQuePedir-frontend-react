import { Button } from "@mui/material"
import "./RestorantToReview.css"
import { useNavigate } from 'react-router-dom'

export const RestorantToReview = (props: any) => {
    const navigate = useNavigate()

    return (
        <div className="RestorantToReview">
            <h2>{props.nombre}</h2>
            <div className="flexContainer">
                <div className="columna1">
                    <p>{props.puntuacion} {props.tiempo}</p>
                </div>
                <div className="columna2">
                    <p><Button onClick={() => navigate('/review-restorant')}>Calificar</Button></p>
                </div>
            </div>
        </div>
    )
}