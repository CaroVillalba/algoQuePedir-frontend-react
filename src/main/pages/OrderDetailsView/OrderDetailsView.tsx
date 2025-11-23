import { Button } from "primereact/button"
import { Image } from "primereact/image"
import { Toast } from "../../../components/common/toast"
import { useState } from "react"
import { useOnInit } from "../../../hooks/useOnInit"
import type { Order } from "../../../types/Order"
import { orderService } from "../../../services/OrderService"
import { useParams } from 'react-router-dom';

export const OrderDetailsView = () => {
    const { id } = useParams()
    const [order, setOrder] = useState<any>({
        comission:0.0,
        direction:{},
        dishes:[{
            description:"",
            id:0,
            imageUrl:"",
            price:0.0,
            quantity:0
        }],
        id:0,
        increment:0.0,
        localName:"",
        paymentMethod:"",
        quantity:0,
        state:"",
        subtotal:0.0,
        time:"",
        total:0.0,
        user:{}
    })

    const getOrder = async() => {
        const loadedOrder = await orderService.getById(Number(id))
        setOrder(loadedOrder)
    }

    useOnInit(() => {
        getOrder()
    })

    return (
        <div className="OrderDetailsView">
            <div className="h-full flex flex-column">
                <div className="flex-1 overflow-y-auto">
                    <div className="p-2">
                        <div className="font-bold text-lg mb-3">Restaurante</div>
                            <div className="flex align-items-center">
                                <Image 
                                    src={ order.dishes[0].imageUrl }
                                    alt={ order.localName }  
                                    width="60" 
                                    height="60" 
                                    imageClassName="border-round-lg mr-3"
                                />
                                <div>
                                    <div className="font-bold">{ order.localName }</div>
                                    <small className="text-color-secondary text-sm">
                                        { '?' } km · { /*localCheckout.freeDelivery ? 'Envío gratis' :*/ 'Envío con costo' }
                                    </small>
                                </div>
                            </div>
                    </div>

                    <div className="p-2">
                        <div className="font-bold text-lg mb-3">Artículos</div>
                        {order.dishes.map((item: { id: number; name: string; quantity: number; price: number; imageUrl?: string }) => (
                            <div key={item.id} className="flex justify-content-between align-items-center mb-3">
                                <div>
                                    <div className="font-bold">{item.name}</div>
                                    <small className="text-color-secondary block text-sm">Cantidad: {item.quantity}</small>
                                    <small className="text-color-secondary text-sm">Precio unitario: ${item.price.toFixed(2)}</small>
                                </div>
                                <div className="flex flex-column align-items-center">
                                    <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-2">
                        <div className="font-bold text-lg mb-3">Resumen</div>
                        <div className="flex justify-content-between mb-2">
                            <span>Subtotal</span>
                            <span>${/*subtotal.toFixed(2)*/}</span>
                        </div>
                        <div className="flex justify-content-between mb-2">
                            <span>Recargo por tipo de pago</span>
                            <span>${/*paymentFee.toFixed(2)*/}</span>
                        </div>
                        <div className="flex justify-content-between mb-2">
                            <span>Tarifa de entrega</span>
                            <span>${/*DELIVERY_FEE.toFixed(2)*/}</span>
                        </div>
                        <div className="flex justify-content-between align-items-center mt-3">
                            <span className="font-bold text-lg">Total</span>
                            <span className="font-bold text-lg">${/*total.toFixed(2)*/}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}