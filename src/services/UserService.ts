import { CRUDService } from './CRUDService'
import type { User } from '../types/User'


class UserService extends CRUDService<User>{
    constructor (){
        super('user')
    }

    async getUserProfile(username : string) : Promise<User>{
        const response = await this.api.get<User>(`/${this.path}`, {
            params : { username }
        })
        return response.data
    }


}

export const userService = new UserService()