import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { ScrollPanel } from 'primereact/scrollpanel'
import { Divider } from 'primereact/divider'
import { Image } from 'primereact/image'
import { Dropdown } from 'primereact/dropdown'
import { useState } from 'react'
import '../../../CustomButtons.css'

export const OrderCheckoutView = () => {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Tacos al Pastor', qty: 1, unitPrice: 12.99, total: 12.99 },
        { id: 2, name: 'Quesadillas de Pollo', qty: 2, unitPrice: 7.99, total: 15.98 },
        { id: 3, name: 'Guacamole con Totopos', qty: 1, unitPrice: 8.50, total: 8.50 },
    ])

    const [paymentMethod, setPaymentMethod] = useState(null)

    const paymentOptions = [
        { label: 'Efectivo', value: 'cash' },
        { label: 'Tarjeta de Crédito', value: 'card' },
        { label: 'QR', value: 'qr' }
    ]

    const handleRemoveItem = (itemId: number) => {
        setCartItems(currentItems => currentItems.filter(item => item.id !== itemId))
    }

    const handleClearCart = () => {
        setCartItems([])
    }

    return (
        <div className="h-screen flex flex-column">
            <Toolbar 
                start={<Button icon="pi pi-arrow-left" className="p-button-text" />} 
                center="Tu pedido" 
            />

            <ScrollPanel className='flex-1'>
                <div className=' p-3'>
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
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-content-between align-items-center mb-3">
                            <div>
                                <div className="font-bold">{item.name}</div>
                                <small className="text-color-secondary block">Cantidad: {item.qty}</small>
                                <small className="text-color-secondary">Precio unitario: ${item.unitPrice.toFixed(2)}</small>
                            </div>
                            <div className="flex align-items-center">
                                <span className="font-bold mr-3">${item.total.toFixed(2)}</span>
                                <Button 
                                    icon="pi pi-times" 
                                    className="p-button-text p-button-rounded p-button-custom-icon-color"
                                    onClick={() => handleRemoveItem(item.id)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <Divider />
                <div className="p-3">
                    <div className="font-bold text-lg mb-3">Resumen</div>
                    <div className="flex justify-content-between mb-2">
                        <span className="text-color-secondary">Subtotal</span>
                        <span>$37.47</span>
                    </div>
                    <div className="flex justify-content-between mb-2">
                        <span className="text-color-secondary">Recargo por tipo de pago</span>
                        <span>$2.62</span>
                    </div>
                    <div className="flex justify-content-between mb-2">
                        <span className="text-color-secondary">Tarifa de entrega</span>
                        <span>$0.00</span>
                    </div>
                    <Divider />
                    <div className="flex justify-content-between align-items-center mt-3">
                        <span className="font-bold text-lg">Total</span>
                        <span className="font-bold text-lg">$43.84</span>
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
                label="Confirmar pedido" 
                className="p-button-custom-primary w-full mb-2" 
                disabled={!paymentMethod}
                />
                <Button 
                label="Limpiar carrito de compras" 
                className="p-button-outlined p-button-custom-secondary w-full mb-2"
                onClick={handleClearCart}
                disabled={cartItems.length === 0} 
                />
            </div>
        </div>
    )
}