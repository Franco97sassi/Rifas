import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Container, Grid, ListItem, ListItemText, Typography, useMediaQuery } from '@mui/material';
import Footer from '../../components/footer/footer';
import NavBar from '../../components/navbar/NavBar.jsx';
import { useParams } from "react-router-dom";
import { useTheme } from '@emotion/react';
const host = import.meta.env.VITE_SV_HOST;

const OrdenesDetail = () => {
  const [ordenes, setOrdenes] = useState([]);
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const userId = userData?.user?.id;
  const { preferenceId } = useParams();
  const theme1 = useTheme();
  const isNonMobileScreens = useMediaQuery(theme1.breakpoints.up('md')); // Cambio de 'min-width' a 'up'

  useEffect(() => {
    // Si no hay ID de usuario, detener la solicitud
    if (!userId) {
      return;
    }

    console.log(userId)

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
  console.log(ordenes)

  return (
    <>
      <NavBar />
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Container>
          <Box
            style={{
              background: "#D9D9D9",

              marginBottom: "28px",
              marginTop: "28px",
              borderRadius: "5px",

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

                      background: "rgba(66, 62, 63, 0.54)",
                      backgroundPosition: "center",

                      borderRadius: 2,
                      paddingTop: "0.5rem",
                      textAlign: "center",
                      height: "61px",

                    }}
                  >
                    <Typography
                      variant="h5"
                      fontWeight="700"
                      fontFamily={'TanPearl'}
                      fontSize={"2rem"}
                      color="rgba(255, 255, 255, 1)"
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
                        padding: "2rem",
                        textAlign: "left",

                      }}>
                      <Typography fontSize="16px" variant="h7" sx={{ color: 'black', fontWeight: 'bold' }}>   Orden ID: {ordenes.id}</Typography>


                      <Typography fontSize="16px" variant="h7" sx={{ color: 'black', fontWeight: 'bold' }}>
                        Fecha y Hora: {ordenes.createdAt.slice(0, 10)} {ordenes.createdAt.slice(11, 19)}
                      </Typography>
                      <Typography fontSize="16px" variant="h7" sx={{ color: 'black', fontWeight: 'bold' }}>  Estado: {ordenes.estado} </Typography>
                      <Typography fontSize="16px" variant="h7" sx={{ color: 'black', fontWeight: 'bold' }}> Comprador:{ordenes.cart[0].username}</Typography>
                    </Box>
                  </Typography>


                  {ordenes?.cart?.map((el) => {
                    return (
                      <>

                        <>

                          <ListItem>
                            <Box sx={{
                              display: "flex",
                              flexDirection: isNonMobileScreens ? "row" : "column"
                            }}>
                              <Box
                                sx={{
                                  width: isNonMobileScreens ? "230px" : "80%",
                                  // height: "282px",

                                  background: "rgba(30, 30, 30, 0.54)",
                                  backgroundSize: "contain",
                                  backgroundPosition: "center",
                                  backgroundRepeat: "no-repeat",
                                  // borderRadius: 2,
                                  padding: "1rem",
                                  textAlign: "center",
                                  transition: "0.3s",
                                  "&:hover": {
                                    boxShadow: " 0px 5px 61px 6px #D9D9D9",
                                  },
                                }}
                              >
                                <Typography
                                  variant="body1"
                                  fontSize="13px"
                                  // key={el.id}
                                  textOverflow="ellipsis"
                                  style={{
                                    color: "#FFFFFF",
                                    fontWeight: "600",
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
                                    borderRadius: 10,
                                    borderColor: "rgba(66, 62, 63, 1)",
                                    borderStyle: "solid",
                                    borderWidth: "6px",
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
                                    height: "70px",
                                    width: "100%",
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
                                      textAlign: 'center', fontWeight: "700", fontSize: "20px"
                                    }}>
                                    Valor por número
                                  </Typography>
                                  <Typography
                                    variant='h6'

                                    style={{ color: 'rgba(217, 217, 217, 0.9)', textAlign: 'center', fontWeight: "700", fontSize: "15px" }}>
                                    ${el.numbersPrice}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box
                                sx={{
                                  width: isNonMobileScreens ? "50rem" : "80%",
                                  height: "334px",
                                  background: "rgba(30, 30, 30, 0.54) ",
                                  backgroundSize: "contain",
                                  backgroundPosition: "center",
                                  backgroundRepeat: "no-repeat",
                                  // borderRadius: 2,
                                  display: "flex",
                                  flexDirection: "row",
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
                                    paddingLeft="5rem"
                                    fontSize={20}

                                    style={{ color: "#FFFFFF", fontWeight: "bold" }}
                                  >
                                    Números:
                                  </Typography>
                                  {/* <Typography
                      variant="body1"
                      // paddingTop="10px"
                      paddingLeft={5}
                         fontSize="20px"
                      style={{ color: "#FFFFFF", fontWeight: "bold" }}
                    >
                     {el.number}
                    </Typography> */}
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
                                    }}
                                  >
                                    {/* {el.number.map((numbe) => (
                        
                        <Button
                          //  key={number}
                          sx={{
                            backgroundColor: "#423E3F",
                            borderRadius: "50%",
                            fontSize: "2rem",
                            width: "4rem",
                            height: "4rem",
                            display: "flex",
                            margin: "0.5rem",
                            color: "#D9D9D9",
                            "&:hover": {
                              backgroundColor: "#423E3F",
                            },
                          }}
                        >
                          {number}
                        </Button>
                      ))}  */}
                                  </Box>

                                </Box>



                                <ListItemText

                                  primary={
                                    <Typography
                                      variant="h5"
                                      style={{
                                        color: "#FFFFFF",
                                        textAlign: "right",
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "flex-end",
                                        paddingTop: "235px",
                                        fontSize: "20px",
                                        paddingRight: "1rem",
                                        fontWeight: "bold",
                                      }}

                                    >
                                      <Box
                                      >
                                        Subtotal: ${
                                          // e.numbers.length * 
                                          el.numbersPrice}
                                      </Box>
                                    </Typography>
                                  }
                                  style={{ textAlign: "right" }}
                                />

                              </Box> </Box>
                          </ListItem>











                        </>
                      </>
                    )
                  })}

                  <Typography variant="h5" sx={{
                    textAlign: 'right', fontSize: "20px",
                    paddingRight: '4rem', paddingBottom: "2rem", fontWeight: "bold"
                  }}>
                    Total: ${calcularTotalCompra(ordenes.cart).toFixed(2)}
                  </Typography>

                  <hr />
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

