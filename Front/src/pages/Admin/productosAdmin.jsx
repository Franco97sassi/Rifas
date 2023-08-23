 

import { Box, Button, Divider, Grid, Input, TextField } from '@mui/material';
import Footer from '../../components/footer/footer';
import NavBar from '../../components/navbar/navBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CurrentRifasAdmin from '../../components/currentRifasAdmin/CurrentRifasAdmin.jsx';
import AllOrdenes from '../Orden/AllOrden';
import { Link } from 'react-router-dom';

const host = import.meta.env.VITE_SV_HOST;

const ProductosAdmin = () => {
  const [product, setProduct] = useState('');
  const [imgProduct, setImgProduct] = useState('');
  const [description, setDescription] = useState('');
  const [numbersPrice, setNumbersPrice] = useState('');
  const [totalNumbers, setTotalNumbers] = useState('');



  const onSubmit = async () => {
    if (!product || !imgProduct || !description || !numbersPrice || !totalNumbers) {
      console.error('Todos los campos deben completarse');
      return;
    }

    const data = {
      product: product,
      imgProduct: imgProduct,
      description: description,
      numbersPrice: numbersPrice,
      totalNumbers: totalNumbers,
    };

    console.log(data)
    try {
      const res = await axios.post(`${host}/rifas/createRifa`, data);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
  const [otherRifas, setOtherRifas] = useState([]);
  const loadOtherRifas = async () => {
    try {
      const res = await axios.get(`${host}/rifas/otherRifas`);
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
              display:"flex", justifyContent:"flexStart",paddingLeft:"4.5em"
              }}> ,
 
             <h2  >Lista de Productos</h2></Box>
              
             <Box sx={{
              display:"flex", justifyContent:"flex-end"
              }}> ,

            <Link to="/agregar">  
             <Button
            variant="contained"
            sx={{
              
              

              width: "10rem",
              height: "44px",
              fontSize: "1.05rem",
              borderRadius: "40px",
              color: "#423E3F",
              fontWeight: "700",
              marginRight: "5rem",
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