import { CRUDService } from './CRUDService'
import type { Local, LocalPublic, LocalCheckout } from '../types/Local'

class LocalService extends CRUDService<Local>{
    constructor(){
        super('local')
    }

    async getPublicById(id: number): Promise<LocalPublic> {
        const response = await this.api.get<LocalPublic>(`/${this.path}/${id}`)
        return response.data
    }

    async getRestaurants(): Promise<Local[]>{ 
        const response = await this.api.get<Local[]>(`/${this.path}`)
        return response.data
    }

    async getRestaurantsBySearch(query: string): Promise<Local[]>{
        const response = await this.api.get<Local[]>(`/${this.path}`, { params: { query } })
        return response.data
    }

    async getCheckoutInfo(id: number): Promise<LocalCheckout> {
        const response = await this.api.get<LocalCheckout>(`/${this.path}/order-checkout/${id}`)
        return response.data
    }
}

export const localService = new LocalService ()