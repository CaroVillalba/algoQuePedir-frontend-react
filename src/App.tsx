import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
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

interface RouteConfig {
  title: string
  showBackButton: boolean
}

// Ver si es mejor idea separar AppContent en otro archivo
function AppContent() {
  const location = useLocation()
  // const hideFooterRoutes = ['/login', '/register']
  // const shouldShowFooter = !hideFooterRoutes.includes(location.pathname)

  const routeConfig: Record<string, RouteConfig> = {
    '/login': { title: 'Iniciar Sesion', showBackButton: false},
    '/profile': { title: 'Perfil', showBackButton: false },
    'criteria': { title: 'Selecciona tu criterio', showBackButton: true},
    'ingredientsAvoid' : { title: ' Ingredientes a evitar ', showBackButton: true },
    'ingredientsPreffered' : { title: ' Ingredientes preferidos ', showBackButton: true },
    '/restaurant-menu': { title: 'Menú del Restaurante', showBackButton: true },
    '/order-checkout': { title: 'Tu pedido', showBackButton: true }
  }

  const basePath = Object.keys(routeConfig).find(path =>
    location.pathname.startsWith(path)
  )

  const matchedConfig = basePath ? routeConfig[basePath] : { title: '', showBackButton: false }

return (
    <div className="App">

        <Routes>
          <Route path='/' element={<LayoutMain/>}>
              <Route path='/profile' element={<LayoutProfile/>}>
                <Route path="/profile" element={<ProfileView />} />
                <Route path="criteria" element= {<SearchCriteria/>} />
                <Route path= "ingredientsAvoid" element= {<IngredientsAvoid/>}/>
                <Route path= "ingredientsPreffered" element= {<IngredientsPreffered/>}/>
              </Route>
              {/*<Route path='/cart' element={<LayoutCart/>}></Route>*/}
              <Route path="/restaurant-menu/:id" element={<RestaurantMenuView />} />
              <Route path="/order-checkout/:id" element={<OrderCheckoutView />} />
              <Route path="/home" element={<StoreSearch />} />
              <Route path="/orders" element={<OrderView />} />
              <Route path="/review" element={<ReviewsView />} />
              <Route path="/review-restorant" element={<ReviewRestorantView/>} />
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
