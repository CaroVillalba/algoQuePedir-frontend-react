import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import 'primereact/resources/themes/lara-light-blue/theme.css'  
import 'primereact/resources/primereact.min.css'                
import 'primeicons/primeicons.css'
import './App.css'
import { ProfileView } from './views/ProfileView/ProfileView'

function App() {

  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path ="/profile" element={<ProfileView />}></Route>
      </Routes>
    </div>
    </BrowserRouter>

  )
}

export default App