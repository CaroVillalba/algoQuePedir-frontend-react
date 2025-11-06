import { CRUDService } from './CRUDService'
import type { Local } from '../types/Local'

class LocalService extends CRUDService<Local>{
    constructor(){
        super('local')
    }

    async getRestaurants(): Promise<Local[]>{ 
        const response = await this.api.get<Local[]>(`/${this.path}`)
        return response.data
    }


}

export const localService = new LocalService ()