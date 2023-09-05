import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Container, Grid, ListItem, ListItemText, Typography, useMediaQuery } from '@mui/material';
import Footer from '../../components/footer/footer';
import NavBar from '../../components/navbar/NavBar.jsx';
import { Link } from 'react-router-dom';
import OrdenesDetail from './OrdenDetail';
import OrdenCard from '../Admin/OrdenCard';
import { useTheme } from '@emotion/react';
import '../../index.css'

const svHost = import.meta.env.VITE_SV_HOST;
const OrdenesComponent = () => {
  const [ordenes, setOrdenes] = useState([]);
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const userId = userData?.user?.id;
  const theme1 = useTheme();
  // const isNonMobileScreens = useMediaQuery(theme1.breakpoints.up('md')); // Cambio de 'min-width' a 'up'
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

  useEffect(() => {
    // Si no hay ID de usuario, detener la solicitud
    if (!userId) {
      return;
    }

    // console.log(userId)

    // Realizar la solicitud GET a las órdenes del usuario con el ID de usuario como parte de la URL
    axios.get(`${svHost}/rifas/ordenes/${userId}`)
      .then(response => {
        setOrdenes(response.data);
      })
      .catch(error => {
        console.log('Error en la solicitud GET a las órdenes:', error);
      });
  }, [userId]);
  const calcularTotalCompra = (cart) => {
    return cart.reduce((total, el) => total + el.numbersPrice, 0);
  };
  // console.log(ordenes)
  const handleDetalleClick = (id) => {
    window.location.href = `/ordenes/${id}`;
  }
  return (
    <>
      <NavBar />
      <Box sx={{fontFamily: "Work Sans",
              display:"flex", justifyContent:isNonMobileScreens?"flexStart":"center",
              paddingLeft:isNonMobileScreens?"2.5em":"0em"

              }}>  
         <h2>Pedidos</h2></Box>
         <Box
     margin='2rem'
     boxShadow='12px 12px 12px -5px rgba(0,0,0,0.75)'
     borderRadius='0.5rem'
     padding='3em'
      
      gap="2em"
      // flexDirection='row'
     sx={{
      bgcolor: '#D9D9D9',      
     }}> 
        <Grid container spacing={2}>
          {ordenes?.map((purchase) => (
            <Grid item key={purchase.id} xs={12} sm={6} md={4} lg={3}>
              <Box
                border={1}
                padding={2}
                borderRadius={8}
                style={{
                  borderColor: '#ccc',
                  background: " rgba(30, 30, 30, 0.64)" ,                 
                  boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                   

                }}
              >
                <Typography variant="subtitle1" sx={{ color: '#FFFFFF', fontWeight: 'bold',fontFamily: 'Work Sans' }} gutterBottom>
                  Fecha: {purchase.createdAt.slice(0, 10)}
                </Typography>
                <Typography variant="body2" sx={{ color: '#FFFFFF', fontWeight: 'bold',fontFamily: 'Work Sans' }} gutterBottom>
                  Estado: {purchase.estado}
                </Typography>

                <Button onClick={() => handleDetalleClick(purchase.preferenceId)} sx={{ color: '#FFFFFF',fontFamily: 'Work Sans' }}> ver detalles</Button>

              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default OrdenesComponent;

