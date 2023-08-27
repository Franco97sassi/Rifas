 
import React, { useState } from 'react';
import { Button, Menu, MenuItem, IconButton, useTheme } from '@mui/material';
import { AccountCircleRounded } from '@mui/icons-material';
import { Box } from '@mui/system';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

//////////////////////////////////////////////////////////
const UserIcon = ({ onLoginClick, onRegisterClick   }) => {
 const [anchorEl, setAnchorEl] = useState(null);
 const theme = useTheme();
 const font = theme.palette.others.font;
 const userDataString = sessionStorage.getItem('userData');
 const userData = userDataString ? JSON.parse(userDataString) : null;
 const isUserLoggedIn = userData && userData.user && userData.token;
 //  console.log('USER DATAAA', userData);
 const isUserAdmin = isUserLoggedIn && userData.user.admin;
 const handleMenuOpen = (event) => {
  event.preventDefault();
  setAnchorEl(event.currentTarget);
 };

 const handleMenuClose = (event) => {
  setAnchorEl(null);
 };

 const handleLoginClick = () => {
  handleMenuClose();
  onLoginClick();
 };

 const handleRegisterClick = () => {
  handleMenuClose();
  sessionStorage.removeItem('userData');
  window.location.href = '/';
 };
//  const handleProductos = () => {
//     handleMenuClose();
//     window.location.href = '/admin/productos';
//     };

 const handleScroll = () => {
  setAnchorEl(null);
 };
 const handleMisOrdenes = () => {
    handleMenuClose();
    window.location.href = '/ordenes';
    };
    // const handleMisOrdenes = () => {
    //     handleMenuClose();
    //     window.location.href = '/ordenesAdmin';
    //     };
     const handlePanel = () => {
        handleMenuClose();
        window.location.href = '/productosAdmin';
        };
        const handleOrdenes = () => {
          handleMenuClose();
          window.location.href = '/ordenesAdmin';
          };

 document.addEventListener('scroll', handleScroll);

 return (
  <>
    
   <IconButton onClick={handleMenuOpen}>
    <AccountCircleRounded sx={{ color: font, fontSize: '45px' }} />
   </IconButton>
    <Menu
     
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleMenuClose}
    disableScrollLock={true}
    PaperProps={{
        style: {
          backgroundColor: '#D68E30',
          width: '200px', // Ajusta el ancho según tus necesidades
            maxHeight: '400px', // Ajusta el alto máximo según tus necesidades
        },
      }}>
     {isUserAdmin ?  ( 
      <div>  
    <Box sx={{textAlign:"center", py: 1 }}> <h4>Panel Admin </h4> 
    </Box>  
    </div> ):(
      <Box sx={{textAlign:"center", py: 1 }}> <h4>Menu </h4> 
      </Box> 
    )}
   <Box sx={{width:"center",  }}> 
    <MenuItem    onClick={handleRegisterClick}
      sx={{
        display:"flex",justifyContent:"center" // Añade el estilo para centrar el texto
      }}
    >Cerrar Sesion</MenuItem> 
    
 
     </Box>
    {isUserAdmin ?  (
        <div> 
    <MenuItem onClick={handleOrdenes}   sx={{
    display:"flex",justifyContent:"center" // Añade el estilo para centrar el texto
  }} >  Ordenes</MenuItem>
    <MenuItem onClick={handlePanel}   sx={{
    display:"flex",justifyContent:"center" // Añade el estilo para centrar el texto
  }} >  Panel</MenuItem>
    </div>
    ) : (
       
        <MenuItem onClick={handleMisOrdenes}   sx={{
          display:"flex",justifyContent:"center" // Añade el estilo para centrar el texto
        }}>Mis Pedidos</MenuItem>
        
    )}
   </Menu> 
  </>
 );
};

export default UserIcon;