import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import { Image } from 'primereact/image'
import { Dialog } from 'primereact/dialog'
import { InputNumber } from 'primereact/inputnumber'
import { TabView, TabPanel } from 'primereact/tabview'
import { Toast } from '../../../components/common/toast'
import { useCart } from '../../../hooks/useCart'
import { useOnInit } from '../../../hooks/useOnInit'
import { useToast } from '../../../hooks/useToast'
import type { CartItem } from '../../../types/Order'
import { localService } from '../../../services/LocalService'
import { dishService } from '../../../services/DishService'
import './RestaurantMenuView.css'
import type { LocalPublic } from '../../../types/Local'
import type { Dish } from '../../../types/Dish'

// TODO: Mejorar estilos y agregar datos reales del back, incorporar con los clientes guardados en el repo

let initialLocalState: LocalPublic = {
    id: 0,
    name: '',
    imgURL: '',
    rating: 0,
    reviews: 0,
    orders: 0,
}

export const RestaurantMenuView = () => {
    const [local, setLocal] = useState<LocalPublic>(initialLocalState)
    const [dishes, setDishes] = useState<Dish[]>([])
    const navigate = useNavigate()
    const { id: restaurantIdParam } = useParams()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [selectedDish, setSelectedDish] = useState<Dish | null>(null)
    const [quantity, setQuantity] = useState(1)
    const addItem = useCart(state => state.addItem)
    const totalItems = useCart(state => state.getTotalItems())
    const { toast, showToast } = useToast()
    const cartRestaurantId = useCart(state => state.restaurantId)

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
            unitPrice: selectedDish.price,
            total: selectedDish.price * quantity,
        }

        const ok = addItem(newItem, Number(restaurantIdParam))

        if (!ok) {
            showToast(
                'Ya tenés productos de otro local. Finalizá el pedido o limpiá el carrito.',
                'warning'
            )
            return
        }

        handleModalCancel()
    }

    const getLocal = async () => {
        try {
            if (restaurantIdParam) {
                let data = await localService.getPublicById(Number(restaurantIdParam))
                setLocal(data)
            }
        } catch (error) {
            console.error('Error fetching local:', error)
        }
    }

    const getDishes = async () => {
        try {
            if (restaurantIdParam) {
                const data = await dishService.getByLocal(Number(restaurantIdParam))
                setDishes(data)
            }
        } catch (error) {
            console.error('Error fetching dishes:', error)
        }
    }

    useOnInit(() => {
        getLocal()
        getDishes()
    })

    return (
        <div className="restaurant-menu-container">
            <div className="restaurant-container">
                <div className="restaurant-header">
                    <Image
                    src={local.imgURL}
                    alt={local.name}
                    className="restaurant-image-wide"
                    imageClassName="restaurant-image-inner"
                    />
                </div>

                <div className="restaurant-content">
                    <div className="restaurant-body">
                        <h1 className="restaurant-title">{local.name}</h1>
                        <small className="restaurant-meta">
                        {local.rating} ★ ({local.reviews}+ reseñas) – {local.orders} pedidos
                        </small>
                    </div>
                </div>
            </div>
            <TabView>
                <TabPanel header="Menú">
                    <div className="menu-section">
                        <h2 className="menu-section-title">Popular</h2>

                        {dishes.map((dish, index) => (
                            <div
                                key={dish.id}
                                className={`menu-dish ${index === 0 ? 'first' : ''}`}
                                onClick={() => handleOpenModal(dish)}
                            >
                            <div className="dish-info">
                                <div className="dish-name">{dish.name}</div>
                                <small className="dish-description">{dish.description}</small>
                                <div className="dish-price-tag">${dish.price.toFixed(2)}</div>
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

            {totalItems > 0 && Number(restaurantIdParam) === cartRestaurantId && (
                <div className="fixed-bottom checkout-bar">
                    <Button
                        label={`Ver Pedido (${totalItems} ${totalItems === 1 ? 'item' : 'items'})`}
                        className="p-button-custom-primary w-full"
                        onClick={() => navigate(`/order-checkout/${restaurantIdParam}`)}
                    />
                </div>
            )}

            <Dialog
                visible={isModalVisible}
                onHide={handleModalCancel}
                modal
                closable={false}
                header={selectedDish?.name}
                className="w-full max-w-25rem"
                contentClassName="w-full"
                footer={
                    <div className="flex gap-2 w-full">
                        <Button 
                            label="Cancelar" 
                            onClick={handleModalCancel} 
                            className="p-button-custom-secondary h-3rem w-full"
                        />
                        <Button
                            label="Agregar al Pedido"
                            onClick={handleModalAddItem}
                            className="p-button-custom-primary h-3rem w-full"
                        />
                    </div>
                }
            >
                {selectedDish && (
                    <div>
                        <Image src={selectedDish.imageUrl} alt={selectedDish.name} width="100%" imageClassName="w-full h-5 border-round-lg mb-3" />
                        <p className="text-color-secondary">{selectedDish.description}</p>
                        <Divider />
                        <div className="flex justify-content-between align-items-center">
                            <span className="font-bold w-2">Precio unitario</span>
                            <span className='w-6 text-right'>${selectedDish.price.toFixed(2)}</span>
                        </div>
                        <Divider />
                        <div className="flex justify-content-between align-items-center my-2">
                            <InputNumber
                            value={quantity}
                            onValueChange={(e) => setQuantity(e.value ?? 1)}
                            showButtons
                            buttonLayout="horizontal"
                            min={1}
                            max={99}
                            incrementButtonIcon="pi pi-plus"
                            decrementButtonIcon="pi pi-minus"
                            className="w-12"
                            />
                        </div>
                    </div>
                    )}
                <div className="flex justify-content-between align-items-center">
                    <span className="font-bold">Precio total</span>
                    <span>${(selectedDish ? selectedDish.price * quantity : 0).toFixed(2)}</span>
                </div>
            </Dialog>
        
            <div id="toast-container">
                <Toast toast = { toast } />
            </div>
        </div>
    )
}
