import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import 'primereact/resources/themes/lara-light-blue/theme.css'  
import 'primereact/resources/primereact.min.css'                
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './App.css'

import { Header } from './components/Header'
import Footer from './components/Footer'
import { ProfileView } from './main/pages/ProfileView/ProfileView'
import { RestaurantMenuView } from './main/pages/RestaurantMenuView/RestaurantMenuView'
import { OrderCheckoutView } from './main/pages/OrderCheckoutView/OrderCheckoutView'
import { StoreSearch } from './main/pages/HomeView/StoreSearch'
import { CartProvider } from './context/CartProvider' 
import { SearchCriteria } from './main/pages/SearchCriteriaProfile/SearchCriteria'

interface RouteConfig {
  title: string
  showBackButton: boolean
}

// Ver si es mejor idea separar AppContent en otro archivo
function AppContent() {
  const location = useLocation()

  const routeConfig: Record<string, RouteConfig> = {
    '/profile': { title: 'Perfil', showBackButton: false },
    './criteria': { title: 'Selecciona tu criterio', showBackButton: true},
    '/restaurant-menu': { title: 'Menú del Restaurante', showBackButton: true },
    '/order-checkout': { title: 'Tu pedido', showBackButton: true }
  }

  const basePath = Object.keys(routeConfig).find(path =>
    location.pathname.startsWith(path)
  )

  const matchedConfig = basePath ? routeConfig[basePath] : { title: '', showBackButton: false }

  return (
    <div className="App">
      <Header title={matchedConfig.title} showBackButton={matchedConfig.showBackButton} />

      <main className="main-content">
        <Routes>
          <Route path="/profile" element={<ProfileView />} />
          <Route path="profile/criteria" element= {<SearchCriteria/>} />
          <Route path="/restaurant-menu/:id" element={<RestaurantMenuView />} />
          <Route path="/order-checkout" element={<OrderCheckoutView />} />
          <Route path="/" element={<StoreSearch />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </CartProvider>
  )
}
