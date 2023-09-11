import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Container, Divider, Grid, ListItem, ListItemText, Typography, useMediaQuery } from '@mui/material';
import Footer from '../../components/footer/footer';
import NavBar from '../../components/navbar/NavBar.jsx';
import { useParams } from "react-router-dom";
import { useTheme } from '@emotion/react';
import '../../index.css'
import "./index.css"
const host = import.meta.env.VITE_SV_HOST;

const OrdenesDetail = () => {
  const [ordenes, setOrdenes] = useState([]);
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const userId = userData?.user?.id;
  const { preferenceId } = useParams();
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
    // axios.get(`${host}/ordenesAgregadas/${preferenceId}`)
    axios.get(`${host}/rifas/ordenesAgregadas/${preferenceId}`)

      .then(response => {
        setOrdenes(response.data);
      })
      .catch(error => {
        console.log('Error en la solicitud GET a las órdenes:', error);
      });
  }, [preferenceId]);

const calcularTotalCompra = (cart) => {
    return cart.reduce((total, el) => total + el.numbersPrice, 0);
  };
  // console.log(ordenes)


  const groupedCart = {};
  if (ordenes.cart){  
  ordenes.cart.forEach((el) => {
    if (!groupedCart[el.productName]) {
      groupedCart[el.productName] = [];
    }
    groupedCart[el.productName].push(el);
  });}



  return (
    <>
      <NavBar />
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          
           
           }}>
        <Container >
          <Box
            style={{
              background: "#D9D9D9",
 
              marginBottom: "28px",
              marginTop: "28px",
              borderRadius: "5px", 
              padding: '20px', // Añadir un espacio adicional para el subtotal
               
             }}
          >




            {ordenes.length === 0 ? (
              <Typography variant="body1">No se encontraron órdenes para el usuario.</Typography>
            ) : (
              <ul>


                <Box sx={{ marginBottom: "100px" }}>



                  <Box
                    sx={{

                      // height: "282px",

                      // background: "rgba(66, 62, 63, 0.54)",
                      backgroundPosition: "center",

                      borderRadius: 2,
                      paddingTop: "0.5rem",
                        textAlign: "center",
                      height: "61px",
                      display:"flex",
                      flexDirection:"column",
              alignContent:"center"  

                    }}
                  >

                    <Typography
                      variant="h5"
                      fontWeight="700"
                      fontFamily={'TanPearl'}
                      fontSize= {isNonMobileScreens?"2rem":"1rem"} 
                      color="rgba(66, 62, 63, 1)"
                       
                       sx={{fontFamily: "Work Sans" }}
                    >
                    Detalle del  Pedido
                    </Typography>
                  </Box>

                  {/* Mostrar información relevante de la orden */}

                  <Typography variant="h4">

                    <Box
                      sx={{
                        // width: "230px",
                        // height: "282px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                        background: "#D9D9D9",
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        borderRadius: 2,
                        padding: isNonMobileScreens?"2rem":"0rem",
 
                        textAlign: isNonMobileScreens?"left":"center",
                        
                        alignContent:"center",
                        paddingLeft: isNonMobileScreens?"2.7rem":"0rem",


                      }}>
                      <Typography fontSize="16px" variant="h7" sx={{ color: 'black', fontWeight: 'bold',fontFamily: 'Work Sans' }}>   Órden ID: {ordenes.id}</Typography>


                      <Typography fontSize="16px" variant="h7" sx={{ color: 'black', fontWeight: 'bold',fontFamily: 'Work Sans' }}>
                        Fecha y Hora: {ordenes.createdAt.slice(0, 10)} {ordenes.createdAt.slice(11, 19)}
                      </Typography> 
                      <Typography fontSize="16px" variant="h7" sx={{ color: 'black', fontWeight: 'bold',fontFamily: 'Work Sans' }}>  Estado: {ordenes.estado} </Typography>  
                      <Typography fontSize="16px" variant="h7" sx={{ color: 'black', fontWeight: 'bold',fontFamily: 'Work Sans' }}> Comprador:{ordenes.cart[0].username}</Typography>
                    </Box>
                  </Typography>


                  {/* {ordenes?.cart?.map((el,i) => {
                    return (
                      <div key={i} > 
                      

                          <ListItem
                          sx={{
                            display: "flex",
                            flexDirection: isNonMobileScreens ? "row" : "column",
                            justifyContent:"center",
                            alignContent:"center"}}>
                            <Box sx={{
                              display: "flex",
                              flexDirection: isNonMobileScreens ? "row" : "column",
                              justifyContent:"center",
                              alignContent:"center"
                            }}>
                              <Box
                                sx={{
                                  width: isNonMobileScreens ? "230px" : "100%",
                                  // height: "282px",

                                  background: isNonMobileScreens ?"rgba(30, 30, 30, 0.54)":null,
                                  backgroundSize: "contain",
                                  backgroundPosition: "center",
                                  backgroundRepeat: "no-repeat",
                                  // borderRadius: 2,
                                  padding: isNonMobileScreens ?"1rem":"0rem",
                                  textAlign: "center",
                                  display:"flex",
                                  flexDirection:"column", justifyContent:"center",
                                  alignContent:"center",
                                   transition: "0.3s",
                                  "&:hover": {
                                    boxShadow: " 0px 5px 61px 6px #D9D9D9",
                                  },

                                }}
                              >
                                <Typography
                                  variant="body1"
                                  fontSize="1.5rem"
                                  // key={el.id}
                                  textOverflow="ellipsis" 
                                   style={{
                                      
                                    fontWeight: "600", fontFamily: 'Work Sans'
                                  }}
                                >
                                  {el.productName}
                                </Typography>
                                <img
                                  src={el.imgProduct}
                                  alt={el.product}
                                  style={{
                                    width: "172px",
                                    height: "190px",
                                    marginBottom: "1rem",
                                     
                                  }}
                                />

                                <Box


                                  sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center',

                                    border: '0.2em solid #213911d2',
                                    borderRadius: '20px',
                                    bgcolor: '#D9D9D9',
                                    height: "60px",
                                    width:isNonMobileScreens? "100%":"100%",
                                    background: "rgba(66, 62, 63, 1)"
                                    // height: 300,
                                    // width: 300,
                                    // boxShadow:
                                    //  '3px 3px 15px 3px rgba(11,61,15,1),  inset 0px 0px 66px 17px rgba(41,125,47,1)',
                                  }}>

                                  <Typography
                                    variant='h6'
                                    color="rgba(217, 217, 217, 0.9)
"

                                    style={{
                                      color: 'rgba(217, 217, 217, 0.9)',
                                      textAlign: 'center', fontWeight: "700", fontSize: "20px",fontFamily: 'Work Sans'
                                    }}>
                                    Valor por número
                                  </Typography>
                                  <Typography
                                    variant='h6'

                                    style={{ color: 'rgba(217, 217, 217, 0.9)', textAlign: 'center', fontWeight: "700", fontSize: "15px",fontFamily: 'Work Sans' }}>
                                    ${el.numbersPrice}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box
                                sx={{
                                  width: isNonMobileScreens ? "50rem" : "100%",
                                  height: "334px",
                                  background: isNonMobileScreens ?"rgba(30, 30, 30, 0.54) ":null,
                                  backgroundSize: "contain",
                                  backgroundPosition: "center",
                                  backgroundRepeat: "no-repeat",
                                  // borderRadius: 2,
                                  display: "flex",
                                  flexDirection: isNonMobileScreens ?"row":"column",
                                  justifyContent: "center",  
                                  // Añade un poco de espacio en la parte inferior
                                  paddingTop: "1.1rem", // Añade un poco de espacio en la parte inferior

                                }}
                              >


                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    paddingTop: "1px",
                                    paddingBottom: "1rem", // Añade un poco de espacio en la parte inferior
                                    maxHeight: "282", // Establece una altura máxima para la caja
                                    // overflowY: "auto", // Habilita el desplazamiento vertical si el contenido excede la altura máxima
                                    paddingRight: "0.1rem", // Añade un poco de espacio en la parte derecha
                                    // Añade un poco de espacio en la parte superior
                                    // Añade un poco de espacio en la parte inferior
                                  }}
                                >
                                  <Typography
                                    variant="body1" 
                                    // paddingTop="10px"
                                    // paddingLeft="5rem" 
                                    fontSize={20}

                                    style={{   fontWeight: "bold",fontFamily: 'Work Sans' }}
                                  >
                                    Números:
                                  </Typography>
                                   
                                  <Box
                                    color="#D9D9D9"
                                    backgroundColor='#423E3F'

                                    borderRadius='50%'
                                    fontSize='20px'
                                    width="46px" fontWeight="700"
                                    height="46px"
                                     display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                  >
                                      {el.number} 

                                  </Box>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexWrap: "wrap",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      textAlign: isNonMobileScreens? "right" :"center"
                                    }}
                                  >
                                   
                                  </Box>

                                </Box>



                                <ListItemText

                                  primary={
                                    <Typography
                                      variant="h5"
                                      style={{
                                        
                                        textAlign: "center",
                                        display: "flex",
                                        flexDirection: "row",
                                          justifyContent: "flex-end",
                                        paddingTop: isNonMobileScreens?"275px":"15px",
                                        fontSize: "20px",
                                        // paddingRight: "1rem",
                                        fontWeight: "bold",
                                         fontFamily: 'Work Sans',
                                         paddingRight:"5px"
                                      }}

                                    >
                                      {/* <Box
                                      > */}
                                        {/* Subtotal: ${ */}
                                          {/* // e.numbers.length *  */}
                                          {/* el.numbersPrice} */}
                                      {/* </Box> */}
                                    {/* </Typography>
                                  }
                                  style={{ textAlign: "right" }}
                                />

                              </Box> </Box>
                          </ListItem> */}











                          {/* </div>
                    )
                  })} */}



 {/* } */}


 {Object.entries(groupedCart).map(([productName, productItems], i) => (
                    <div key={i}>
                      <ListItem
                        sx={{
                          display: "flex",
                          flexDirection: isNonMobileScreens ? "row" : "column",
                          justifyContent: "center",
                          alignContent: "center",
                        }}
                      >
                        <Box sx={{
                          display: "flex",
                          flexDirection: isNonMobileScreens ? "row" : "column",
                          justifyContent: "center",
                          alignContent: "center"
                        }}>
                          <Box
                            sx={{
                              width: isNonMobileScreens ? "230px" : "100%",
                              background: isNonMobileScreens ? "rgba(30, 30, 30, 0.54)" : null,
                              backgroundSize: "contain",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                              padding: isNonMobileScreens ? "1rem" : "0rem",
                              textAlign: "center",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignContent: "center",
                              transition: "0.3s",
                              "&:hover": {
                                boxShadow: " 0px 5px 61px 6px #D9D9D9",
                              },
                            }}
                          >
                            <Typography
                              variant="body1"
                              fontSize="1.5rem"
                              style={{
                                fontWeight: "600", fontFamily: 'Work Sans'
                              }}
                            >
                              {productName}
                            </Typography>
                            <img
                              src={productItems[0].imgProduct}
                              alt={productName}
                              style={{ display: "block",
                                margin: "0 auto",
                                width: "172px",
                                height: "190px",
                                marginBottom: "1rem",
                              }}
                            />

                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-evenly',
                                alignItems: 'center',
                                border: '0.2em solid #213911d2',
                                borderRadius: '20px',
                                bgcolor: '#D9D9D9',
                                height: "60px",
                                width: isNonMobileScreens ? "100%" : "100%",
                                background: "rgba(66, 62, 63, 1)"
                              }}
                            >
                              <Typography
                                variant='h6'
                                color="rgba(217, 217, 217, 0.9)"
                                style={{
                                  color: 'rgba(217, 217, 217, 0.9)',
                                  textAlign: 'center', fontWeight: "700", fontSize: "20px", fontFamily: 'Work Sans'
                                }}>
                                Valor por número
                              </Typography>
                              <Typography
                                variant='h6'
                                style={{ color: 'rgba(217, 217, 217, 0.9)', textAlign: 'center', fontWeight: "700", fontSize: "15px", fontFamily: 'Work Sans' }}>
                                ${productItems[0].numbersPrice}
                              </Typography>
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              width: isNonMobileScreens ? "50rem" : "100%",
                              height: "334px",
                              background: isNonMobileScreens ? "rgba(30, 30, 30, 0.54) " : null,
                              backgroundSize: "contain",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                              display: "flex",
                              flexDirection: isNonMobileScreens ? "row" : "column",
                              justifyContent: "center",
                              paddingTop: "1.1rem",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                paddingTop: "1px",
                                paddingBottom: "1rem",
                                maxHeight: "282",
                                paddingRight: "0.1rem",overflowY: 'auto'
                              }}
                            >
                              <Typography
                                variant="body1"
                                fontSize={20}
                                style={{ fontWeight: "bold", fontFamily: 'Work Sans' }}
                              >
                                Números:
                              </Typography>
<Box sx={{display:"flex",gap: "0.5rem",
flexDirection:"row",flexFlow:"wrap",}}>  
                              {productItems.map((item, index) => (
                                <Box
 
                                  color="#D9D9D9"
                                  backgroundColor='#423E3F'
                                  borderRadius='50%'
                                  fontSize='20px'
                                  width="46px"
                                  fontWeight="700"
                                  height="46px"
                                  display="flex"
                                  flexDirection="row"
                                  justifyContent="center"
                                  alignItems="center"
                                   style={{ marginBottom: '10px' }}
                                 
                                >
                                  {item.number}
                                </Box>
                              ))}</Box>
                            </Box>
                            <ListItemText
                              primary={
                                <Typography
                                variant="h5"
                                style={{
                                  color: "black",
                                  // textAlign: "right",
                                  // display: "flex",
                                  // flexDirection: "row",
                                  // justifyContent: "flex-end",
                                  // alignItems: "flex-end",
                                  marginTop: isNonMobileScreens ? "8rem" : "1rem",
                                  padding: isNonMobileScreens ? "0.5rem" : "1rem",
                                  fontSize: "20px",
                                  fontWeight: "bold", fontFamily: 'Work Sans',
                                    position: "absolute",
                                  bottom: "0",
                                  left: "0",
                                  width: "100%",
                                  paddingRight: "2.5rem",
                                 display: "flex",
                                   justifyContent:isNonMobileScreens ?" flex-end":"center", /* Alinea el contenido del subtotal a la derecha */
                                    alignItems: "center",
                                    overflowX: 'hidden',
                                    paddingBottom:"10px"
                                  }} 
                                >
                                  Subtotal: ${productItems.reduce((subtotal, item) => subtotal + item.numbersPrice, 0)}
                                </Typography> 
                                
                              }
                              style={{ textAlign: "right" }} 
                            /> 
{isNonMobileScreens ? null : <Divider sx={{ width: '100%' }} />}                          </Box>
                        </Box>
                      </ListItem>
                    </div>
                  ))}





















                  <Typography variant="h5" sx={{  overflowX: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    animation: 'scrollToLeft 5s linear infinite',
                    textAlign:  isNonMobileScreens? "right" :"center" , fontSize: "20px",
                    paddingRight: isNonMobileScreens?'3.5rem':"0rem", paddingBottom: "2rem", fontWeight: "bold",fontFamily: 'Work Sans'
                  }}>
                    Total: ${parseInt(calcularTotalCompra(ordenes.cart).toFixed(2))}
                  </Typography>

                  
                </Box>


              </ul> 
            )}

          </Box>
        </Container>
        <Footer />
      </Box>
    </>
  );
};

export default OrdenesDetail;

