import "./OrderCard.css"

export const OrderCard = (props: any) => {
    return (
        <div className="OrderCard">
            <div className="order-card-image">
                <img className="local-img" src={props.imageURL}/>
            </div>
            <div className="order-card-text">
                <p><b>{props.local}</b></p>
                <p>Total: ${props.costo}</p>
                <p>{props.fecha} - {props.articulos} articulos</p>
            </div>
            <div className="order-card-button">
                <input type="button" value="borrar"/>
            </div>
        </div>
    )
}