//import { useOutletContext } from "react-router-dom"
import { RestorantToReview } from "./RestorantToReview/RestorantToReview"
//import type { ProfileContextType } from "../../../types/ProfileContextType"
import { authService } from "../../../services/AuthService"
import { userService } from "../../../services/UserService"
import { useOnInit } from "../../../hooks/useOnInit"
import { useState } from "react"

export const ReviewsView = () => {

    //const { profile, showToast } = useOutletContext<ProfileContextType>()
    //const { profileInfo, setProfileInfo } = profile

    const loadReviews = async () => {
        const username = authService.getLoggedUsername()!!
        const userProfile = await userService.getUserProfile(username)
        setItems(userProfile.pendingRatings as any)
        // pendingRatings is not declared on User; cast to any (or define a proper type) to avoid the implicit any index error
        console.log(username)
        console.log(userProfile)
    }

    const [items, setItems] = useState([
        {localId: 1, localName:"La Pizzeria", localRating:"4,5", lastOrderDate:"25-35 min"},
        {localId: 2, localName:"El Gran Sabor", localRating:"4,2", lastOrderDate:"30-40 min"},
        {localId: 3, localName:"Sushi Express", localRating:"4,8", lastOrderDate:"20-30 min"},
        {localId: 4, localName:"Burger Joint", localRating:"4,0", lastOrderDate:"25-35 min"}
    ])

    //console.log(profileInfo)
    useOnInit(() => {
        loadReviews()
    })


    return (
        <div className = "ReviewsView">
            <h1>Restaurantes a Calificar</h1>
            <div className = "pendingReviews">
                {items.map(item => (
                    <RestorantToReview localId={item.localId} nombre={item.localName} puntuacion={item.localRating} tiempo={item.lastOrderDate}></RestorantToReview>
                ))}
            </div>
        </div>
    )
}