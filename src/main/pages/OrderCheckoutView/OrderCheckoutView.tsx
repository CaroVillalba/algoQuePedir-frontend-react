import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { Image } from 'primereact/image'
import { useState } from 'react'
import { useCart } from '../../../hooks/useCart'
import { orderService } from '../../../services/OrderService'
import { localService } from '../../../services/LocalService'
import { useParams } from 'react-router-dom'
import { useOnInit } from '../../../hooks/useOnInit'
import type { LocalCheckout } from '../../../types/Local'

//TODO: Mejorar estilos (asumo que con crear un mini .css es suficiente)
export const OrderCheckoutView = () => {
    const { id } = useParams()
    const restaurantId = Number(id)

    const { 
        getItemsByRestaurant,
        getSubtotalByRestaurant,
        removeItem,
        clearCart
    } = useCart()

    const cartItems = getItemsByRestaurant(restaurantId)
    const subtotal = getSubtotalByRestaurant(restaurantId)

    const [paymentMethod, setPaymentMethod] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const [localCheckout, setLocalCheckout] = useState<LocalCheckout>({
        id: 0,
        name: '',
        imgURL: '',
        freeDelivery: false,
        deliveryFee: 0,
        paymentMethods: []
    })

    const paymentOptions = (localCheckout.paymentMethods ?? []).map(pm => {
        const method = pm.name || ''
        return {
            label: method.charAt(0).toUpperCase() + method.slice(1),
            value: method
        }
    })

    const PAYMENT_FEES: Record<string, number> = (localCheckout.paymentMethods ?? [])
    .reduce((acc: Record<string, number>, pm) => {
        const method = pm.name || ''
        const tax = pm.tax ?? 1
        acc[method] = tax
        return acc
    }, {})

    // Función para redondear como en el back, puesto que sino hay una diferencia de 0.01 centavos (al menos hasta donde hice pruebas)
    const round2 = (n: number) =>
        Number(
            n.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })
        )

    const DELIVERY_FEE = round2(localCheckout.freeDelivery ? 0 : (localCheckout.deliveryFee ?? 0))

    const baseTotal = round2(subtotal + DELIVERY_FEE)

    const paymentFee = round2(baseTotal * ((PAYMENT_FEES[paymentMethod] ?? 1) - 1))
    const total = round2(subtotal + paymentFee + DELIVERY_FEE)

    const handleConfirmOrder = async () => {
        try {
            setLoading(true)

            const response = await orderService.confirmOrder(
                cartItems,
                restaurantId,
                paymentMethod
            )

            console.log('Pedido confirmado ✅', response)
            window.alert('Pedido confirmado correctamente')

            clearCart(restaurantId)

        } catch (error) {
            console.error('Error al confirmar pedido:', error)
            window.alert('Hubo un error al confirmar el pedido ❌')
        } finally {
            setLoading(false)
        }
    }

    const getLocal = async () => {
        try {
            if (restaurantId) {
                const data = await localService.getCheckoutInfo(restaurantId)
                setLocalCheckout(data)
                console.log(data)
            }
        } catch (error) {
            console.error('Error fetching local:', error)
        }
    }

    useOnInit(() => {
        getLocal()
    })

    return (
        <div className="h-full flex flex-column">
            <div className="flex-1 overflow-y-auto">
                <div className="p-2">
                    <div className="font-bold text-lg mb-3">Restaurante</div>
                        <div className="flex align-items-center">
                            <Image 
                                src={localCheckout.imgURL}
                                alt={localCheckout.name}  
                                width="60" 
                                height="60" 
                                imageClassName="border-round-lg mr-3"
                            />
                            <div>
                                <div className="font-bold">{localCheckout.name}</div>
                                <small className="text-color-secondary text-sm">
                                    4.8 · 5 km · {localCheckout.freeDelivery ? 'Envío gratis' : 'Envío con costo'}
                                </small>
                            </div>
                        </div>
                </div>

                <div className="p-2">
                    <div className="font-bold text-lg mb-3">Artículos</div>
                    {cartItems.map(item => (
                        <div key={item.id} className="flex justify-content-between align-items-center mb-3">
                            <div>
                                <div className="font-bold">{item.name}</div>
                                <small className="text-color-secondary block text-sm">Cantidad: {item.qty}</small>
                                <small className="text-color-secondary text-sm">Precio unitario: ${item.unitPrice.toFixed(2)}</small>
                            </div>
                            <div className="flex flex-column align-items-center">
                                <span className="font-bold">${(item.unitPrice * item.qty).toFixed(2)}</span>
                                <Button 
                                    icon="pi pi-times" 
                                    className="p-button-rounded p-button-text p-button-sm text-red-500" 
                                    onClick={() => removeItem(item.id, restaurantId)} 
                                    tooltip="Eliminar artículo"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-2">
                    <div className="font-bold text-lg mb-3">Resumen</div>
                    <div className="flex justify-content-between mb-2">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-content-between mb-2">
                        <span>Recargo por tipo de pago</span>
                        <span>${paymentFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-content-between mb-2">
                        <span>Tarifa de entrega</span>
                        <span>${DELIVERY_FEE.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-content-between align-items-center mt-3">
                        <span className="font-bold text-lg">Total</span>
                        <span className="font-bold text-lg">${total.toFixed(2)}</span>
                    </div>
                </div>

                <div className="p-2">
                <label htmlFor="payment" className="font-bold block mb-2">Forma de pago</label>
                <Dropdown 
                    id="payment"
                    value={paymentMethod}
                    options={paymentOptions}
                    onChange={(e) => setPaymentMethod(e.value)}
                    placeholder="Seleccione una opción"
                    className="w-full"
                />
                </div>
            </div>
            <div className="p-2 flex flex-column gap-3">
                <Button 
                    label={loading ? 'Confirmando...' : 'Confirmar pedido'} 
                    className="p-button-custom-primary w-full" 
                    disabled={!paymentMethod || cartItems.length === 0}
                    onClick={handleConfirmOrder}
                />
                <Button 
                    label="Limpiar carrito" 
                    className="p-button-custom-secondary w-full"
                    onClick={() => clearCart(restaurantId)}
                    disabled={cartItems.length === 0} 
                />
            </div>
        </div>
    )
}
