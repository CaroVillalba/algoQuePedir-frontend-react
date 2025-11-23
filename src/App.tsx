import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'primereact/resources/themes/lara-light-blue/theme.css'  
import 'primereact/resources/primereact.min.css'                
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './App.css'

import { LayoutMain } from './main/LayoutMain'
import { ProfileView } from './main/pages/ProfileView/ProfileView'
import { RestaurantMenuView } from './main/pages/RestaurantMenuView/RestaurantMenuView'
import { OrderCheckoutView } from './main/pages/OrderCheckoutView/OrderCheckoutView'
import { Login } from './main/pages/AuthView/Login/LoginView'
import { Register } from './main/pages/AuthView/Register/RegisterView'
import { StoreSearch } from './main/pages/HomeView/StoreSearch'
import { SearchCriteria } from './main/pages/ProfileView/SearchCriteria/SearchCriteria'
import { ReviewsView } from './main/pages/ReviewsView/ReviewsView'
import { ReviewRestorantView } from './main/pages/ReviewRestorantView/ReviewRestorantView'
import { LayoutProfile } from './main/pages/ProfileView/LayoutProfile'
import { OrderView } from './main/pages/OrderView/OrderView'
import { IngredientsAvoid } from './main/pages/ProfileView/Ingredients/IngredientsAvoid'
import { IngredientsPreffered } from './main/pages/ProfileView/Ingredients/IngredientsPreffered'
import { OrderDetailsView } from './main/pages/OrderDetailsView/OrderDetailsView'

function AppContent() {
  return (
      <div className="App">
          <Routes>
            <Route path='/' element={<LayoutMain/>}>
                {/*<Route path='/cart' element={<LayoutCart/>}></Route>*/}
                <Route path="/home" element={<StoreSearch />} />
                <Route path="/restaurant-menu/:id" element={<RestaurantMenuView />} />
                <Route path="/order-checkout/:id" element={<OrderCheckoutView />} />
                <Route path="/orders" element={<OrderView />} />
                <Route path="/orders/:id" element={<OrderDetailsView/>} />
                <Route path="/review" element={<ReviewsView />} />
                <Route path="/review-restorant" element={<ReviewRestorantView/>} />
                <Route path='/profile' element={<LayoutProfile/>}>
                  <Route path="/profile" element={<ProfileView />} />
                  <Route path="criteria" element= {<SearchCriteria/>} />
                  <Route path= "ingredients-avoid" element= {<IngredientsAvoid/>}/>
                  <Route path= "ingredients-preffered" element= {<IngredientsPreffered/>}/>
                </Route>
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* <Route path="/" element={<Navigate to={pathLocation} replace />} /> /}
            {/ loading && LOADER */}
          </Routes>
      </div>
    )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
