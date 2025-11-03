import * as React from 'react';
import './Footer.css';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useLocation } from 'react-router-dom';



export default function SimpleBottomNavigation() {
    
   
  const location = useLocation(); 

  //evito que al recargar la pagina se pierda la seleccion del footer
  const getValueFromPath = (path: string) => {
    switch (path) {
        case '/': return 0;
        case '/profile': return 3;
        default: return 0;
    }
  };

  const [value, setValue] = React.useState(getValueFromPath(location.pathname));

  React.useEffect(() => {
    setValue(getValueFromPath(location.pathname));
  }, [location.pathname]);

  return (
    <Box component="footer"
      className="footer-container">
      <BottomNavigation
        showLabels
        value={value}
        className="bottom-nav"
      >
        <BottomNavigationAction label="Inicio" icon={<HomeFilledIcon /> } component={Link} to="/" />
        <BottomNavigationAction label="Pedidos" icon={<ReceiptIcon />}/>
        <BottomNavigationAction label="Calificar" icon={<StarBorderIcon />} />
        <BottomNavigationAction label="Perfil" icon={<PersonIcon />} component={Link} to="/profile" />
      </BottomNavigation>
    </Box>
  ); 
}