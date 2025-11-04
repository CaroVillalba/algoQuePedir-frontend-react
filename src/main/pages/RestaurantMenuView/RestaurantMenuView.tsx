import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from 'primereact/button'
import { ScrollPanel } from 'primereact/scrollpanel'
import { Divider } from 'primereact/divider'
import { Image } from 'primereact/image'
import { Dialog } from 'primereact/dialog'
import { InputNumber } from 'primereact/inputnumber'
import { TabView, TabPanel } from 'primereact/tabview'
import { useCart } from '../../../hooks/useCart'
import type { CartItem } from '../../../types/Order'
import './RestaurantMenuView.css'

// TODO: Mejorar estilos y agregar datos reales del back, incorporar con los clientes guardados en el repo

interface Dish {
    id: number
    name: string
    unitPrice: number
    description: string
    imageUrl: string
}

const DUMMY_RESTAURANT = {
    id: 1,
    name: 'Restaurante Italiano',
    imageUrl: 'https://picsum.photos/seed/restaurant/400/200',
    rating: 4.5,
    reviews: 1200,
    orders: 546,
}

const DUMMY_DISHES: Dish[] = [
    { id: 1, name: 'Pizza Margherita', unitPrice: 12.99, description: 'Clásica pizza con tomate, mozzarella y albahaca.', imageUrl: 'https://picsum.photos/seed/pizza1/200/200' },
    { id: 2, name: 'Pizza Pepperoni', unitPrice: 13.99, description: 'Pizza con salsa de tomate, mozzarella y pepperoni.', imageUrl: 'https://picsum.photos/seed/pizza2/200/200' },
    { id: 3, name: 'Spaghetti Carbonara', unitPrice: 14.99, description: 'Spaghetti con salsa cremosa, panceta y parmesano.', imageUrl: 'https://picsum.photos/seed/pasta1/200/200' },
    { id: 4, name: 'Fettuccine Alfredo', unitPrice: 13.99, description: 'Fettuccine con cremosa salsa Alfredo.', imageUrl: 'https://picsum.photos/seed/pasta2/200/200' },
]

export const RestaurantMenuView = () => {
    const navigate = useNavigate()
    const { id: restaurantIdParam } = useParams()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [selectedDish, setSelectedDish] = useState<Dish | null>(null)
    const [quantity, setQuantity] = useState(1)
    const { addItem, totalItems } = useCart()

    const handleOpenModal = (dish: Dish) => {
        setSelectedDish(dish)
        setQuantity(1)
        setIsModalVisible(true)
    }

    const handleModalCancel = () => {
        setIsModalVisible(false)
        setSelectedDish(null)
    }

    const handleModalAddItem = () => {
        if (!selectedDish || !restaurantIdParam) return

        const newItem: CartItem = {
            id: selectedDish.id,
            name: selectedDish.name,
            qty: quantity,
            unitPrice: selectedDish.unitPrice,
            total: selectedDish.unitPrice * quantity,
        }

        addItem(newItem, Number(restaurantIdParam))
        handleModalCancel()
    }

    return (
        <div className="restaurant-menu-container">
            <ScrollPanel className="flex-1">
                <div className="restaurant-container">
                    <div className="restaurant-header">
                        <Image
                        src={DUMMY_RESTAURANT.imageUrl}
                        alt="Restaurante"
                        className="restaurant-image"
                        imageClassName="restaurant-image-inner"
                        />
                    </div>

                    <div className="restaurant-content">
                        <div className="restaurant-body">
                            <h1 className="restaurant-title">{DUMMY_RESTAURANT.name}</h1>
                            <small className="restaurant-meta">
                            {DUMMY_RESTAURANT.rating} ★ ({DUMMY_RESTAURANT.reviews}+ reseñas) – {DUMMY_RESTAURANT.orders} pedidos
                            </small>
                        </div>
                    </div>
                </div>
                <TabView>
                    <TabPanel header="Menú">
                        <div className="menu-section">
                            <h2 className="menu-section-title">Popular</h2>

                            {DUMMY_DISHES.map((dish, index) => (
                                <div
                                    key={dish.id}
                                    className={`menu-dish ${index === 0 ? 'first' : ''}`}
                                    onClick={() => handleOpenModal(dish)}
                                >
                                <div className="dish-info">
                                    <div className="dish-name">{dish.name}</div>
                                    <small className="dish-description">{dish.description}</small>
                                    <div className="dish-price-tag">${dish.unitPrice.toFixed(2)}</div>
                                </div>
                                <Image
                                    src={dish.imageUrl}
                                    alt={dish.name}
                                    width="80"
                                    height="80"
                                    className="overflow-hidden"
                                    imageClassName="border-round-lg"
                                />
                                </div>
                            ))}
                        </div>
                    </TabPanel>

                    <TabPanel header="Reseñas">
                        <div className="p-3">
                            <p>Aquí irían las reseñas...</p>
                        </div>
                    </TabPanel>
                </TabView>
            </ScrollPanel>

            {totalItems > 0 && (
                <div className="checkout-bar">
                    <Button
                        label={`Ver Pedido (${totalItems} ${totalItems === 1 ? 'item' : 'items'})`}
                        className="p-button-custom-primary w-full"
                        onClick={() => navigate('/order-checkout')}
                    />
                </div>
            )}

            <Dialog
                visible={isModalVisible}
                onHide={handleModalCancel}
                modal
                header={selectedDish?.name}
                className="w-full md:w-6"
                footer={
                <div>
                    <Button label="Cancelar" icon="pi pi-times" onClick={handleModalCancel} className="p-button-text" />
                    <Button
                        label={`Agregar al Pedido ($${(selectedDish ? selectedDish.unitPrice * quantity : 0).toFixed(2)})`}
                        icon="pi pi-check"
                        onClick={handleModalAddItem}
                        autoFocus
                    />
                </div>
                }
            >
                {selectedDish && (
                    <div>
                        <Image src={selectedDish.imageUrl} alt={selectedDish.name} width="100%" imageClassName="border-round-lg mb-3" />
                        <p className="text-color-secondary">{selectedDish.description}</p>
                        <Divider />
                        <div className="flex justify-content-between align-items-center">
                            <span className="font-bold">Precio unitario</span>
                            <span>${selectedDish.unitPrice.toFixed(2)}</span>
                        </div>
                        <Divider />
                        <div className="flex justify-content-between align-items-center my-3">
                            <span className="font-bold">Cantidad</span>
                            <InputNumber
                                value={quantity}
                                onValueChange={(e) => setQuantity(e.value ?? 1)}
                                showButtons
                                buttonLayout="horizontal"
                                min={1}
                                max={99}
                                incrementButtonIcon="pi pi-plus"
                                decrementButtonIcon="pi pi-minus"
                            />
                        </div>
                    </div>
                    )}
            </Dialog>
        </div>
    )
}
