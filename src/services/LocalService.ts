import { CRUDService } from './CRUDService'
import type { Local, LocalPublic } from '../types/Local'

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
}

export const localService = new LocalService ()