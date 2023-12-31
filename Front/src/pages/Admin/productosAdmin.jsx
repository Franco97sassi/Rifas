 

import { Box, Button, Divider, Grid, Input, TextField, useMediaQuery } from '@mui/material';
import Footer from '../../components/footer/footer';
import NavBar from '../../components/navbar/NavBar.jsx'
import { useEffect, useState } from 'react';
import axios from 'axios';
import CurrentRifasAdmin from '../../components/currentRifasAdmin/CurrentRifasAdmin.jsx';
import AllOrdenes from '../Orden/AllOrden';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import '../../index.css'
import   "./index.css"

const host = import.meta.env.VITE_SV_HOST;

const ProductosAdmin = () => {
  const [product, setProduct] = useState('');
  const [imgProduct, setImgProduct] = useState('');
  const [description, setDescription] = useState('');
  const [numbersPrice, setNumbersPrice] = useState('');
  const [totalNumbers, setTotalNumbers] = useState('');
  const theme1 = useTheme();
  // const isNonMobileScreens = useMediaQuery(theme1.breakpoints.up('md')); // Cambio de 'min-width' a 'up'
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');



  // const onSubmit = async () => {
  //   if (!product || !imgProduct || !description || !numbersPrice || !totalNumbers) {
  //     console.error('Todos los campos deben completarse');
  //     return;
  //   }

  //   const data = {
  //     product: product,
  //     imgProduct: imgProduct,
  //     description: description,
  //     numbersPrice: numbersPrice,
  //     totalNumbers: totalNumbers,
  //   };

  //   // console.log(data)
  //   try {
  //     const res = await axios.post(`${host}/rifas/createRifa`, data);
  //     console.log(res);
  //   } catch (error) {
  //     if (error.response) {
  //       console.error('Respuesta del servidor con estado:', error.response.status);
  //       console.error('Datos de respuesta:', error.response.data);
  //     } else if (error.request) {
  //       console.error('No se pudo realizar la solicitud:', error.request);
  //     } else {
  //       console.error('Error:', error.message);
  //     }
  //   }
  // };
    const [otherRifas, setOtherRifas] = useState([]);

  const loadOtherRifas = async () => {
    try {
      // const res = await axios.get(`${host}/rifas/otherRifas`);
      const res = await axios.get(`${host}/rifas/checkRifas`);
      setOtherRifas(res.data); // Actualiza el estado con las rifas de otros usuarios
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadOtherRifas();
  }, []);
  return (
    <>

      <NavBar />
      <Box
   sx={{
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    bgcolor: '#F5F5F5',
   }}>
      
       <Grid    > 
       <Box sx={{
              display:"flex", justifyContent:isNonMobileScreens?"flexStart":"center",
               paddingLeft:isNonMobileScreens?"3.25em":"0",fontFamily: "Work Sans"
              }}> ,
 
             <h2  >Lista de Productos</h2></Box>
              
             <Box sx={{
              display:"flex", justifyContent:isNonMobileScreens?"flex-end":"center"
              }}> ,

            <Link to="/agregar" className='no-underline'>  
             <Button
            variant="contained"
            sx={{
              
              fontFamily: "Work Sans",

              width: "10rem",
              height: "44px",
              fontSize: "1.05rem",
              borderRadius: "40px",
              color: "#423E3F",
              fontWeight: "700",
              marginRight: isNonMobileScreens?"5rem":"0rem",
            backgroundColor: "#D68E30",
              "&:hover": {
                backgroundColor: "#630014",
              },
            }}
            
          >
            Agregar
          </Button>
          </Link>
          </Box>
             </Grid>
            <CurrentRifasAdmin />   
            </Box>
            
 

    </>
  );
};

export default ProductosAdmin; 