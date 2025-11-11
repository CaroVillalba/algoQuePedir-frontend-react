import { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Checkbox } from 'primereact/checkbox'
import { Card } from 'primereact/card'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { useNavigate } from 'react-router-dom'
import './StoreSearch.css'
import { localService } from '../../../services/LocalService'
import type { Local } from '../../../types/Local'

export const PinIcon = ({ esCercano }: { esCercano: boolean }) => {
  if (esCercano) {
    return (
      <div className="local-pin">
        <i className="pi pi-map-marker"></i>
      </div> )
  }
}

export const StoreSearch = () => {

  const [locales, setLocales] = useState<Local[]>([])

 /*  let [locales, setLocales] = useState([
    { id: 1, nombre: 'El Ferroviario', direccion: 'Av. San Martín 1234', imagen: '/temp-images/asado.png', esCercano: true },
    { id: 2, nombre: 'Restorán La Canchita', direccion: 'Belgrano 456', imagen: '/temp-images/milanesa.png', esCercano: false },
    { id: 3, nombre: 'Maribel', direccion: 'Artigas 6950', imagen: '/temp-images/image.png', esCercano: false },
  ]) */

  const [checked, setChecked] = useState(false)
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('') 

 /*  const localesFiltrados = checked
    ? locales.filter((local) => local.esCercano)
    : locales */


  const buscar = async (query: string) => {
    if (!query.trim()) {
      setLocales([])
      return
    }

    try {
      const userId = Number(sessionStorage.getItem("userId"));
      const result = await localService.getRestaurantsBySearch(query, userId);

      setLocales(result);
    }catch (error) {
      console.error('Error al buscar los locales', error)
      window.alert('Hubo un error al buscar los locales.')
    }
  }
  
  function debounce<T extends (...args: any[]) => void>(callback: T, wait: number) {
    let timeout: ReturnType<typeof setTimeout>
    return (...args: Parameters<T>): void => {
      clearTimeout(timeout)
      timeout = setTimeout(() => callback(...args), wait)
    }
  }

  const debouncedBuscar = debounce(buscar, 1000)

  const handleKeyUpBuscar = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value
    setSearchTerm(value)
    debouncedBuscar(value)
  }
  

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
                <InputText  className="search-input" 
                placeholder="Buscá tu local para pedir..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyUp={handleKeyUpBuscar}/>
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
          {locales.map((local) => (
            <div key={local.id} className="grid-item">
              <Card
                className="local-card"
                onClick={() => navigate(`/restaurant-menu/${local.id}`)}
              >
                <div className="local-img-container">
                  <img
                    src={local.imgURL}
                    alt={`Imagen de ${local.name}`}
                    className="local-img"
                  />
                  <PinIcon esCercano={local.esCercano ?? false} />
                </div>

                <div className="local-content">
                  <strong className="local-nombre">{local.name}</strong>
                  <span className="local-direccion">{local.address}</span>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

