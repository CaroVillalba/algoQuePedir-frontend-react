import "./OrderCard.css"

export const OrderCard = (props: any) => {
    return (
        <div className="OrderCard">
                <div className="order-card-image">
                    <img className="local-img" src={props.imageURL}/>
                </div>
                <a className="order-card-text" href={props.href}>
                    <p><b>{props.local}</b></p>
                    <p>Total: ${props.costo}</p>
                    <p>{props.fecha} - {props.articulos} articulos</p>
                </a>
                <div className="order-card-button">
                    <input type="button" value="borrar"/>
                </div>
        </div>
    )
}