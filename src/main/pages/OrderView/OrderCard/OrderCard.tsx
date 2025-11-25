import "./OrderCard.css"
import { Image } from 'primereact/image'

export const OrderCard = (props: any) => {

    const handleCancel = () => {
        props.onCancel(props.id)
    }

    {props.showCancel && (
        <div className="order-card-button">
            <i className="pi pi-ban delete-icon" onClick={handleCancel}></i>
        </div>
    )}


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
                {props.showCancel && (
                    <div className="order-card-button">
                        <i className="pi pi-ban delete-icon" onClick={handleCancel}></i>
                    </div>
                )}
        </div>
    )
}