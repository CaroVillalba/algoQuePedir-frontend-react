import { CRUDService } from './CRUDService'
import type { Order, CartItem } from '../types/Order'

export class OrderService extends CRUDService<Order> {
    constructor() {
        super('order')
    }

    async getOrderDetail(orderId: number): Promise<Order> {
        const response = await this.api.get<Order>(`/${this.path}/orderDetail/${orderId}`)
        return response.data
    }

    /* TODO: Mejorar la forma en la que envía el pedido, 
    ya que luego el get no lo muestra en la página del local por incompatibilidad entre tipos de datos */
    async confirmOrder(
        cartItems: CartItem[],
        restaurantId: number,
        paymentMethod: string
    ): Promise<Order> {
    
        const dto = {
            restaurantId,
            items: cartItems.map(item => ({
                dishId: item.id,
                quantity: item.qty
            })),
            paymentMethod: paymentMethod.toUpperCase()
        }
    
        console.log('DTO a enviar:', dto)
        const response = await this.api.post<Order>(`/${this.path}`, dto)
        return response.data
    }

    async getByStateOrder(state: string): Promise<Order[]> {
        const response = await this.api.get<Order[]>(`/${this.path}`, {
            params: { state }
        })
        return response.data
    }

    async updateOrderState(id: number): Promise<Order> {
        const response = await this.api.patch<Order>(`/${this.path}/${id}`)
        return response.data
    }
}

export const orderService = new OrderService()