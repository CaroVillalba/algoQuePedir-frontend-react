import React, { useState, useEffect } from 'react'
import { TabMenu } from 'primereact/tabmenu'
import { useNavigate, useLocation } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  const navigate = useNavigate()
  const location = useLocation()

  const getIndexFromPath = (path: string) => {
    switch (path) {
      case '/':
        return 0
      case '/profile':
        return 3
      default:
        return 0
    }
  }

  const [activeIndex, setActiveIndex] = useState(getIndexFromPath(location.pathname))

  useEffect(() => {
    setActiveIndex(getIndexFromPath(location.pathname))
  }, [location.pathname])

  const items = [
    { label: 'Inicio', icon: 'pi pi-home', command: () => navigate('/') },
    { label: 'Pedidos', icon: 'pi pi-file' },
    { label: 'Calificar', icon: 'pi pi-star' },
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
