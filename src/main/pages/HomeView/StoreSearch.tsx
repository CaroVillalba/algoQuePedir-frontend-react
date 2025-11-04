import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from 'react'
import './StoreSearch.css'

export const StoreSearch = () => {


  return (

  <>

    <div className="search-header">
      <h2>Delivery</h2>


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
    
  </>

  )

}