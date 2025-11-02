import * as React from 'react';
import './Footer.css';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonIcon from '@mui/icons-material/Person';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box component="footer"
      className="footer-container">
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
            '& .Mui-selected, .Mui-selected > svg': {
            color: 'var(--color-primary)', 
          },
        }}
      >
        <BottomNavigationAction label="Inicio" icon={<HomeFilledIcon />} />
        <BottomNavigationAction label="Pedidos" icon={<ReceiptIcon />} />
        <BottomNavigationAction label="Calificar" icon={<StarBorderIcon />} />
        <BottomNavigationAction label="Perfil" icon={<PersonIcon />} />
      </BottomNavigation>
    </Box>
  ); 
}