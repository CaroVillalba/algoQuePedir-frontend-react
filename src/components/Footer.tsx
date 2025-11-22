import { useState, useEffect } from 'react'
import { TabMenu } from 'primereact/tabmenu'
import { useNavigate, useLocation } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  const navigate = useNavigate()
  const location = useLocation()

  const pathIndexMap: Record<string, number> = {
    '/home': 0,
    '/restaurant-menu': 0,
    '/order-checkout': 0,
    '/orders': 1,
    '/review': 2,
    '/review-restorant': 2,
    '/profile': 3,
    '/profile/criteria': 3,
    '/profile/IngredientsAvoid': 3,
    '/profile/IngredientsPreffered': 3
  }

  const getIndexFromPath = (path: string) => pathIndexMap[path] ?? 0

  const [activeIndex, setActiveIndex] = useState(getIndexFromPath(location.pathname))

  useEffect(() => {
    setActiveIndex(getIndexFromPath(location.pathname))
  }, [location.pathname])

  const items = [
    { label: 'Inicio', icon: 'pi pi-home', command: () => navigate('/home') },
    { label: 'Pedidos', icon: 'pi pi-file', command: () => navigate('/orders') },
    { label: 'Calificar', icon: 'pi pi-star', command: () => navigate('/review') },
    { label: 'Perfil', icon: 'pi pi-user', command: () => navigate('/profile') }
  ]

  return (
    <footer className="footer-container">
      <TabMenu
        model={items}
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
        className="bottom-nav"
      />
    </footer>
  )
}
