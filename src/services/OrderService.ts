import { CRUDService } from './CRUDService'
import type { Order, CheckoutOrder } from '../types/Order'
import axios from 'axios'

export class OrderService extends CRUDService<Order> {
    constructor() {
        super('order')
    }

    async getOrderDetail(orderId: number): Promise<Order> {
        const response = await axios.get(`${this.apiRoot}/${this.path}/orderDetail/${orderId}`)
        return response.data
    }

    async confirmOrder(order: CheckoutOrder): Promise<Order> {
        const response = await axios.post(`${this.apiRoot}/${this.path}`, order)
        return response.data
    }

    async getAllOrder(token?: string): Promise<Order[]> {
        const headers = token ? { Authorization: `Bearer ${token}` } : {}
        const response = await axios.get(`${this.apiRoot}/${this.path}`, { headers })
        return response.data
    }

    async getByStateOrder(state: string): Promise<Order[]> {
        const response = await axios.get(`${this.apiRoot}/${this.path}`, {
            params: { state }
        })
        return response.data
    }

    async getOrderById(id: number): Promise<Order> {
        const response = await axios.get(`${this.apiRoot}/${this.path}/${id}`)
        return response.data
    }

    async updateOrderState(id: number): Promise<Order> {
        const response = await axios.patch(`${this.apiRoot}/${this.path}/${id}`)
        return response.data
    }

    async deleteOrder(id: number): Promise<void> {
        await axios.delete(`${this.apiRoot}/${this.path}/${id}`)
    }
}

export const orderService = new OrderService()
