import { Button } from 'primereact/button'
import { ScrollPanel } from 'primereact/scrollpanel'
import { Divider } from 'primereact/divider'
import { Dropdown } from 'primereact/dropdown'
import { Image } from 'primereact/image'
import { useState } from 'react'
import { useCart } from '../../../hooks/useCart'
import { orderService } from '../../../services/OrderService'

//TODO: Mejorar estilos (asumo que con crear un mini .css es suficiente) y ver como tener la info del restaurante dinámicamente
export const OrderCheckoutView = () => {
    const { cartItems, restaurantId, subtotal, clearCart, removeItem } = useCart()
    const [paymentMethod, setPaymentMethod] = useState<string>('')
    const [loading, setLoading] = useState(false)

    const paymentOptions = [
        { label: 'Efectivo', value: 'cash' },
        { label: 'Tarjeta de Crédito', value: 'card' },
        { label: 'QR', value: 'qr' },
    ]

    // TODO: Ver si traer los fees del back o si hay otra forma mejor para no tenerlos hardcodeados
    const PAYMENT_FEES: Record<string, number> = {
        cash: 1.0,
        card: 1.05,
        qr: 1.05
    }

    const DELIVERY_FEE = 12.5 // TODO: Implementar que el fee sea como el deliveryCost() del back

    const paymentFee = subtotal * (PAYMENT_FEES[paymentMethod] || 1)
    const total = subtotal + paymentFee + DELIVERY_FEE

    const handleConfirmOrder = async () => {
        if (!restaurantId) return
        setLoading(true)
        try {
            const response = await orderService.confirmOrder(cartItems, restaurantId!, paymentMethod)
            console.log('Pedido confirmado ✅', response)
            window.alert('Pedido confirmado correctamente')
            clearCart()
        } catch (error) {
            console.error('Error al confirmar pedido:', error)
            window.alert('Hubo un error al confirmar el pedido ❌')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="h-screen flex flex-column">
            <ScrollPanel className="flex-1">
                <div className="p-3">
                    <div className="font-bold text-lg mb-3">Restaurante</div>
                        <div className="flex align-items-center">
                            <Image 
                                src="https://picsum.photos/200/300"
                                alt="Logo del restaurante" 
                                width="60" 
                                height="60" 
                                className="border-round mr-3"
                            />
                            <div>
                                <div className="font-bold">El Sabor Auténtico</div>
                                <small className="text-color-secondary">4.8 · 5 km · Envío gratis</small>
                            </div>
                        </div>
                </div>

                <Divider />

                <div className="p-3">
                    <div className="font-bold text-lg mb-3">Artículos</div>
                    {cartItems.map(item => (
                        <div key={item.id} className="flex justify-content-between align-items-center mb-3">
                            <div>
                                <div className="font-bold">{item.name}</div>
                                <small className="text-color-secondary block">Cantidad: {item.qty}</small>
                                <small className="text-color-secondary">Precio unitario: ${item.unitPrice.toFixed(2)}</small>
                            </div>
                            <div className="flex align-items-center">
                                <span className="font-bold mr-3">${(item.unitPrice * item.qty).toFixed(2)}</span>
                                <Button 
                                    icon="pi pi-times" 
                                    className="p-button-rounded p-button-danger p-button-sm" 
                                    onClick={() => removeItem(item.id)} 
                                    tooltip="Eliminar artículo"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <Divider />

                <div className="p-3">
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

                <Divider />

                <div className="p-3">
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
            </ScrollPanel>

            <div className="p-3 border-top-1 surface-border">
                <Button 
                    label={loading ? 'Confirmando...' : 'Confirmar pedido'} 
                    className="p-button-custom-primary w-full mb-2" 
                    disabled={!paymentMethod || cartItems.length === 0}
                    onClick={handleConfirmOrder}
                />
                <Button 
                    label="Limpiar carrito de compras" 
                    className="p-button-outlined p-button-secondary w-full mb-2"
                    onClick={clearCart}
                    disabled={cartItems.length === 0} 
                />
            </div>
        </div>
    )
}
