import React, { useState } from 'react';
import { Button, Menu, MenuItem, IconButton, useTheme } from '@mui/material';
import { AccountCircleRounded } from '@mui/icons-material';
import { Box } from '@mui/system';
import '../../index.css'

//////////////////////////////////////////////////////////
const UserIconAdmin = ({ onLoginClick, onRegisterClick   }) => {
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

 const handleScroll = () => {
  setAnchorEl(null);
 };
 
    const handleMisOrdenes = () => {
        handleMenuClose();
        window.location.href = '/ordenes';
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
    disableScrollLock={true}>
        
    <MenuItem onClick={handleRegisterClick}>Cerrar Sesion</MenuItem>
    {isUserAdmin ?  (
    <MenuItem  >  Pedidos</MenuItem>
    ) : (
        <Box  sx={{
            width: 300,
            height: 300,
            backgroundColor: 'blue',
            '&:hover': {
              backgroundColor: 'red',
              opacity: [0.9, 0.8, 0.7],
            },
          }}>  
        <MenuItem onClick={handleMisOrdenes}>Mis Pedidos</MenuItem>
        </Box>
    )}
   </Menu>
  </>
 );
};

export default UserIconAdmin;