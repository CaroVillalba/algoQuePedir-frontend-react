import { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Checkbox } from 'primereact/checkbox'
import { Card } from 'primereact/card'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { useNavigate } from 'react-router-dom'
import './StoreSearch.css'

export const PinIcon = ({ esCercano }: { esCercano: boolean }) => {
  if (esCercano) {
    return (
      <div className="local-pin">
        <i className="pi pi-map-marker"></i>
      </div> )
  }
}

export const StoreSearch = () => {

  const [locales, setLocales] = useState([
    { id: 1, nombre: 'El Ferroviario', direccion: 'Av. San Martín 1234', imagen: '/temp-images/asado.png', esCercano: true },
    { id: 2, nombre: 'Restorán La Canchita', direccion: 'Belgrano 456', imagen: '/temp-images/milanesa.png', esCercano: false },
    { id: 3, nombre: 'Maribel', direccion: 'Artigas 6950', imagen: '/temp-images/image.png', esCercano: false },
  ])

  const [checked, setChecked] = useState(false)
  const navigate = useNavigate()

  const localesFiltrados = checked
    ? locales.filter((local) => local.esCercano)
    : locales

  return (
    <>
      <div className="search-header">
        <h3>Delivery</h3>

        <i className="shopping-cart-container">
          <i className="pi pi-shopping-cart shopping-cart-icon"></i>
        </i>
      </div>

      <div className="search-bar-container">
        <IconField iconPosition="right">
                <InputIcon className="pi pi-search"> </InputIcon>
                <InputText  className="search-input" placeholder="Buscá tu local para pedir..."/>
        </IconField>
      </div>


      <label className="checkbox-container">
        <Checkbox
          inputId="cercanos"
          checked={checked}
          onChange={(e) => setChecked(!!e.checked)}
          className="checkbox"
        />
        <span className="checkbox-label">Buscar locales cercanos</span>
      </label>


      <main className="main-container">
        <h2>Locales de comida</h2>

        <div className="grid">
          {localesFiltrados.map((local) => (
            <div key={local.id} className="grid-item">
              <Card
                className="local-card"
                onClick={() => navigate(`/restaurant-menu/${local.id}`)}
              >
                <div className="local-img-container">
                  <img
                    src={local.imagen}
                    alt={`Imagen de ${local.nombre}`}
                    className="local-img"
                  />
                  <PinIcon esCercano={local.esCercano} />
                </div>

                <div className="local-content">
                  <strong className="local-nombre">{local.nombre}</strong>
                  <span className="local-direccion">{local.direccion}</span>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
