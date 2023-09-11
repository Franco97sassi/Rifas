import React, { useContext, useState } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import "./stylesCart.css"
//-------------------- Components --------------------------
 import Footer from '../../components/footer/footer';
import ShopCart from '../../components/shopCart/shopCart';
import CurrentRifas from '../../components/currentRifas/CurrentRifas';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
// import { CartContext } from '../../contexts/CartContext.Provider';
import  ReactTextTransition  from 'react-text-transition';
import RifaCard from '../../components/rifaCard/RifaCard';
import rifaMuestra  from "./rifaMuestra.js"
import NavBar from '../../components/navbar/NavBar.jsx';
////////////////////
const Cart = ({isUserAdmin}) => {
  
   
   const [noProductMessage, setNoProductMessage] = useState("No hay productos en el carrito");

  return (
    <>

       <Box
   sx={{
    // height: '100vh',
    display: 'flex',
    flexDirection: 'column',
   }}>  
      <NavBar/>
       <Box
    sx={{ flex: '1 1 auto' }}
    bgcolor='#F5F5F5'> 
        <ShopCart isUserAdmin={isUserAdmin}    />   
       

      </Box>  
      <Footer />
        </Box>  
    </>
  );
};

export default Cart;
