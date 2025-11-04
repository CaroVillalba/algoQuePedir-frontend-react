import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useState } from 'react'
import './StoreSearch.css'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const StoreSearch = () => {
  const [locales, setLocales] = useState([
    { id: 1, nombre: 'El Buen Sabor', direccion: 'Av. San Martín 1234', imagen: '/images/local1.jpg'},
    { id: 2, nombre: 'Sabores del Norte', direccion: 'Belgrano 456', imagen: '/images/local2.jpg' },
    { id: 3, nombre: 'Pizzería La Familia', direccion: 'Mitre 789', imagen: '/images/local3.jpg' },
  ])

  const navigate = useNavigate()

  return (

  <>

    <div className="search-header">
      <h3>Delivery</h3>

      <i className="shopping-cart-container">
        <ShoppingCartIcon className='shopping-cart-icon'/>
      </i>
    </div>


    <TextField
      variant="outlined"
      placeholder="Buscá tu local para pedir..."
      size="small"
      fullWidth
      className="search-bar"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />

    <label className="checkbox-container">
      <Checkbox className="checkbox"/>
      <span className="checkbox-label">Buscar locales cercanos</span>
    </label>
    
    <main className="main-container">

      <h2>Locales de comida</h2>

      <Box sx={{ width: '100%' }}>
      <Grid container spacing={2} columns={2}>
        {locales.map((local) => (
          <Grid key={local.id} size={1} className="grid-item">
            <Card sx={{ height: '100%' }}>
              <CardActionArea onClick={() => navigate(`/locales/${local.id}`)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={local.imagen}
                  alt={`Imagen de ${local.nombre}`}
                />
                <CardContent>
                  <Typography variant="subtitle1" noWrap>
                    {local.nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {local.direccion}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    </main>
  </>

  )

}