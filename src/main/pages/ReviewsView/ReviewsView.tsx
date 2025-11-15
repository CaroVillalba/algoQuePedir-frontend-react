import { RestorantToReview } from "./RestorantToReview/RestorantToReview"

export const ReivewsView = () => {
    const items = [
        {nombre:"La Pizzeria", puntuacion:"4,5", tiempo:"25-35 min"},
        {nombre:"El Gran Sabor", puntuacion:"4,2", tiempo:"30-40 min"},
        {nombre:"Sushi Express", puntuacion:"4,8", tiempo:"20-30 min"},
        {nombre:"Burger Joint", puntuacion:"4,0", tiempo:"25-35 min"}
    ]

    const itemList = items.map((item, index) => (
        <RestorantToReview nombre={item.nombre} puntuacion={item.puntuacion} tiempo={item.tiempo}></RestorantToReview>
    ));

    return (
        <div className = "ReviewsView">
            <h1>Restaurantes a Calificar</h1>
            <div className = "pendingReviews">
                {itemList}
            </div>
        </div>
    )
}