import { CRUDService } from './CRUDService'
import type { User } from '../types/User'


class UserService extends CRUDService<User>{
    constructor (){
        super('user')
    }

    async createProfile(user : User) : Promise<User>{
        try{

            const dto = {
                ...user
            }

            const response = await this.api.post<User>(`/${this.path}`, dto)
            return response.data
        } catch(error) {
            console.error('Error posting profile', error)
            throw error
        }

    }


}

export const userService = new UserService()