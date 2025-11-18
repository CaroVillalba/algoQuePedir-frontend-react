import { CRUDService } from './CRUDService'
import type { User } from '../types/User'
import { Password } from '@mui/icons-material'


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


    async updateUserProfile(user : User) : Promise<void>{

        const { address } = user

        const payload = {
            firstname : user.firstname,
            lastname : user.lastname,
            username : user.username,
            password : user.username,
            email: user.email,
            address : {
                street : address.street,
                number: address.number,
                coordinates:{
                    x: address.coordinates.x,
                    y: address.coordinates.y
                }
            },
            location : user.location,
        }
        
        await this.api.patch<User>(`/${this.path}`, payload)
    }



}

export const userService = new UserService()