import "./OrderCard.css"
import { Image } from 'primereact/image'
import { PrimeIcons } from 'primereact/api';

export const OrderCard = (props: any) => {
    return (
        <div className="OrderCard">
                <Image  
                    src={props.imageURL} 
                    alt={props.name} 
                    width="80" 
                    height="80" 
                    imageClassName="border-round-lg image-local"
                />
                <a className="order-card-text" href={props.href}>
                    <p><b>{props.local}</b></p>
                    <span className="secondary-text">
                        <p>Total: ${props.costo}</p>
                        <p>{props.fecha} - {props.articulos} articulos</p>
                    </span>
                </a>
                <div className="order-card-button">
                    <i className="pi pi-ban delete-icon"></i>
                </div>
        </div>
    )
}