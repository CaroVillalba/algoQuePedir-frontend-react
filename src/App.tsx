import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'primereact/resources/themes/lara-light-blue/theme.css'  
import 'primereact/resources/primereact.min.css'                
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './App.css'
import { ProfileView } from './main/pages/ProfileView/ProfileView'
import { OrderCheckoutView } from './main/pages/OrderCheckoutView/OrderCheckoutView'

function App() {

  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path ="/profile" element={<ProfileView />}></Route>
        <Route path ="/order-checkout" element={<OrderCheckoutView />}></Route>
      </Routes>
    </div>
    </BrowserRouter>

  )
}

export default App