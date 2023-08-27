import { Box, Button, Divider, Grid, Input, TextField, Typography, useMediaQuery } from '@mui/material';
import Footer from '../../components/footer/footer';
import NavBar from '../../components/navbar/NavBar.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CurrentRifasAdmin from '../../components/currentRifasAdmin/CurrentRifasAdmin.jsx';
import AllOrdenes from '../Orden/AllOrden';
 const host = import.meta.env.VITE_SV_HOST;
import NavBarLogo from '../../assets/NavBarLogo.png';
import { useTheme } from '@emotion/react';
const Agregar = () => {
  const [product, setProduct] = useState('');
  const [imgProduct, setImgProduct] = useState(null);
  const [description, setDescription] = useState('');
  const [numbersPrice, setNumbersPrice] = useState('');
  const [totalNumbers, setTotalNumbers] = useState('');
  const theme1 = useTheme();
  const isNonMobileScreens = useMediaQuery(theme1.breakpoints.up('md')); // Cambio de 'min-width' a 'up'



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
      window.location.href = '/productosAdmin';

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
        margin={isNonMobileScreens ? '2rem' : '1rem'}
        boxShadow='12px 12px 12px -5px rgba(0,0,0,0.75)'
        borderRadius='0.5rem'
        padding={isNonMobileScreens ? '3em' : '1em'}
        display='flex'
        flexDirection={isNonMobileScreens ? 'row' : 'column'}
        gap={isNonMobileScreens ? '2em' : '1em'}
        bgcolor='#D9D9D9'
      >
        <Box
          display='flex'
          flexDirection='column'
          
          gap='2em'
          alignItems={isNonMobileScreens ? 'center' : 'center'}
        >
          <Typography
            variant='h1'
            fontWeight='700'
            fontSize={isNonMobileScreens ? '24px' : '20px'}
            style={{ color: '#333333', textAlign: 'center' }}
          >
            Agregar Productos
          </Typography>

          <Box
            sx={{
              width: isNonMobileScreens ? '230px' : '100%',
              height: isNonMobileScreens ? '282px' : 'auto',
              background: 'black',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              borderRadius: 6,
              marginTop: isNonMobileScreens ? '4em' : '1em',
              padding: '1rem',
              textAlign: 'center',
              transition: '0.3s',
              '&:hover': {
                boxShadow: isNonMobileScreens ? '0px 5px 61px 6px #FFA840' : 'none',
              },
            }}
          >
            <img
              src={NavBarLogo}
              style={{
                width: isNonMobileScreens ? '172px' : '50%',
                height: isNonMobileScreens ? '178px' : '50%',
                marginBottom: '1rem',
                borderRadius: 10,
              }}
            />
          
          {/* <Typography sx={{ fontSize: "13px", fontWeight: "600", color: "#423E3F" }}>
            {product.numbersPrice}
          </Typography> */}
        </Box>
        {/* <Typography sx={{fontSize:"13px", fontWeight:"600", color:"#423E3F"}}
        >
         $ {rifaDetail.numbersPrice}  {product.numbersPrice}
        </Typography>   */}

    
          <Box
       

       sx={{
 display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  background:"rgba(66, 62, 63, 1)",

         border: '0.2em solid #213911d2',
        borderRadius: '20px',
        bgcolor: '#D9D9D9',
         height: "70px",
         width:"224px",
       
        }}>
    
       <Typography
         variant='h6'
           style={{ color: '#333333', textAlign: 'center',fontWeight:"700",fontSize:"20px" }}>
         Valor por número
        </Typography>
       <Typography
        variant='h6'
         
        style={{ color: '#333333', textAlign: 'center',fontWeight:"700",fontSize:"15px"  }}>
        {/* ${rifaDetail.numbersPrice} */}{product.numbersPrice}
       </Typography>
        </Box> </Box>
     
       
      
      {/* <Typography
       variant='h1'
       marginTop='0em'
       textAlign='left'
       fontWeight="700"
       style={{ color: '#333333'  }}>
       Números Disponibles
      </Typography> */}
       
      
      <div>
        <Box sx={{ display:"flex"  ,
     flexDirection: 'column',  alignItems:"center" ,  justifyContent:"center"  
     
      }} >
 


        
        <Grid container   display="flex" 
                      // paddingLeft="10rem"
                      alignItems="center"
                      
                         >
 
<Grid container spacing={2}  alignItems="center">

{/* <Box sx={{display:"flex",flexDirection:"column"}}>   */}
<Grid item xs={12}>
    <Typography variant="body1">Producto:</Typography>
          <TextField required  
            name="name"
            value={product.name}
            onChange={(e) => setProduct(e.target.value)}
            sx={{width:isNonMobileScreens? 500:"100%"  }}
          /> 
         </Grid>    
          <Grid item xs={12}>
         <Typography variant="body1">Imagen URL:</Typography>
           <TextField required
            name="name"
            value={product.name}
            onChange={(e) => setImgProduct(e.target.value)}
            sx={{width:isNonMobileScreens? 500:"100%"  }}
          /> </Grid>  
      <Grid item xs={12}>    <Typography variant="body1">Descripcion:</Typography>
           <TextField required
            name="name"
            value={product.name}
            onChange={(e) => setDescription(e.target.value)}
            sx={{width:isNonMobileScreens? 500:"100%"  }}
          /> </Grid>
     
        {/* Numbers Price:
        <Grid item xs={12}>
          <TextField required
            name="name"
            value={product.name}
            onChange={(e) => setNumbersPrice(e.target.value)}
            sx={{ width: 500 }}
          />
        </Grid> */}
        <Grid item xs={12}>
    <Typography variant="body1">Precio:</Typography>
           <TextField required
            name="name"
            value={product.name}
            onChange={(e) => setNumbersPrice(e.target.value)}
            sx={{width:isNonMobileScreens? 500:"100%"  }}    
          />   
          
           </Grid>
            <Grid item xs={12}>
    <Typography variant="body1">Numeros:</Typography>
           <TextField required
            name="name"
            value={product.name}
            onChange={(e) => setTotalNumbers(e.target.value)}
            sx={{width:isNonMobileScreens? 500:"100%"  }}          />    </Grid></Grid>
           
        </Grid> <Button  sx={{ marginLeft:isNonMobileScreens?"-100px":"0px",background:"black" ,marginTop: '2rem'}}
      type="submit" onClick={onSubmit} variant="contained"  >Crear Producto</Button>
         </Box>
     </div> 
      </Box> 
 

    </>
  );
};

export default Agregar; 