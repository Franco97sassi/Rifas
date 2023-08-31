import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  useMediaQuery,
  Grid,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

import { removeNumbersToCart, buyRifas } from "../../store/state/actions/rifas";
import "./shopCart.css"; // Importa el archivo CSS para las transiciones
import { Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import { useTheme } from "@emotion/react";
const host = import.meta.env.VITE_SV_HOST;

const ShopCart = ({ isUserAdmin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.rifas.cart);
  console.log(cart)
  const handleDeleteCart = (rifaId) => {
    dispatch(removeNumbersToCart(rifaId));
  };
  const theme1 = useTheme();
  const isNonMobileScreens = useMediaQuery(theme1.breakpoints.up('md')); // Cambio de 'min-width' a 'up'



  //mercado pago
  const [preferenceId, setPreferenceId] = useState(null);
  // initMercadoPago("TEST-b3944798-0320-4a5f-9f12-f95c52c42fd5");

  const createPreference = async () => {
    console.log(createPreference)
    try {
      const response = await axios.post(`${host}/rifas/mercadoPago`, {
        cart

      })
      const { id } = response.data;
      console.log("soy response", response)
      if (response.data.response && response.data.response.body) {
        if (isUserAdmin) {
          // Si el usuario es un administrador, redirige a la página de inicio
          navigate("/ordenesAdmin");
          return;
        } else {
          const initPoint = response.data.response.body.sandbox_init_point

          console.log("soy initPoint", initPoint)
          window.location.href = initPoint
        }
      }
      return id;
    } catch (error) {
      console.log(error);
    }
  };


  const handleBuyClick = () => {

    const { id } = createPreference();

    if (id) {
      setPreferenceId(id);
    }
    //  Filtrar y transformar el carrito según los campos necesarios
    const filteredCart = cart.map((item) => {
      return {
        rifaId: item.rifaId,
        number: item.number,
        userId: item.userId,
      };
    });
    console.log("filtrado", filteredCart);
    // Llamar a la acción buyRifas con el carrito filtrado
    dispatch(buyRifas(filteredCart));
    // navigate("");

  };
  console.log("soy cart", cart)








  return (
    <Box
      display="flex"
      flexDirection={isNonMobileScreens ? "column" : "column"}
      alignItems="center"
      justifyContent="center"
      // alignItems="center"
      // width="80%" // Añadido para reducir el ancho del componente
      // margin="0 auto" // Centra el componente horizontalmente
      padding="0rem"
      width="100%"
    >

      <Typography
        marginTop="1em"
        style={{ color: "#333333" }} // Aumenta el tamaño de la fuente
        variant="h2"
        gutterBottom
      >
        Carrito de Compras
      </Typography>

      <TransitionGroup component={List}>

        {cart && cart.length > 0 ? (
          cart
            .reduce((acc, item) => {
              const existingItem = acc.find((i) => i.rifaId === item.rifaId);
              if (existingItem) {
                existingItem.numbers.push(item.number);
              } else {
                acc.push({ ...item, numbers: [item.number] });
              }
              return acc;
            }, [])
            .map((item) => (
              <CSSTransition key={item.rifaId} classNames="fade" timeout={300}>
                <ListItem  >

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: isNonMobileScreens ? "row" : "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: "15rem",
                         height: "282px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#D9D9D9",
                        borderRadius: 2,
                        padding: "1rem",
                        transition: "0.3s",
                        "&:hover": {
                          boxShadow: " 0px 5px 61px 6px #D9D9D9",
                        },
                      }}
                    >
                      <Typography
                        variant="body1"
                        fontSize="13px"
                        key={item.id}
                        textOverflow="ellipsis"
                        style={{
                          color: "#423E3F",
                          fontWeight: "600",
                        }}
                      >
                        {item.productName}
                      </Typography>
                      <img
                        src={item.imgProduct}
                        alt={item.product}
                        style={{
                          width: "172px",
                          height: "178px",
                          marginBottom: "1rem",
                          borderRadius: 10,
                          borderColor: "#423E3F  ",
                          borderStyle: "solid",
                          borderWidth: "6px",
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "13px",
                          fontWeight: "600",
                          color: "#423E3F",
                        }}
                      >
                        $ {item.numbersPrice}
                      </Typography>
                    </Box>





                    <Box
                      sx={{
                        width: isNonMobileScreens ? "50rem" : "15rem",
                        display: "flex",
                        flexDirection: isNonMobileScreens ? "row" : "column",
                        // justifyContent: "center",

                        alignItems: isNonMobileScreens ? "flex-start" : "center",
                        justifyContent: isNonMobileScreens ? "space-between" : "center",
                        background: "#D9D9D9",
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        borderRadius: 2,
                        marginTop: "1rem",
                          margin: "1rem",
                        minHeight: "6rem",
                        height: isNonMobileScreens ? "max-content" : "max-content",
                        // paddingRight: "0.7rem", // Añade un poco de espacio en la parte inferior
                        // paddingTop: "1.1rem", // Añade un poco de espacio en la parte inferior

                      }}


                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",

                          alignItems: "center",

                          paddingTop: "1px",
                          paddingBottom: "1rem", // Añade un poco de espacio en la parte inferior
                          // Establece una altura máxima para la caja
                          // overflowY: "auto", // Habilita el desplazamiento vertical si el contenido excede la altura máxima
                          // paddingRight: "0.1rem", // Añade un poco de espacio en la parte derecha
                          // Añade un poco de espacio en la parte superior
                          // Añade un poco de espacio en la parte inferior
                        }}
                      >

                        <Typography
                          variant="body1"
                          paddingTop="10px"
                          padding={isNonMobileScreens ? "1rem":"1rem"}

                          style={{ color: "#423E3F", fontWeight: "bold" }}
                        >
                          Números Seleccionados:
                        </Typography>





                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "0.5rem",
                            marginLeft: isNonMobileScreens?"1rem":"0rem",
                            marginTop: isNonMobileScreens?"0.5rem":"0rem",

                           }}
                        >
                          {item.numbers.map((number) => (

                            <Box
                              key={number}
                              sx={{
                                backgroundColor: "#423E3F",
                                borderRadius: "50%",
                                fontSize: "2rem",
                                width: "46px",
                                height: "46px",
                                fontSize: "20px",

                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "#D9D9D9",
                                fontWeight: "700",
                                backgroundColor: "#423E3F",
                                "&:hover": {
                                  backgroundColor: "#423E3F",
                                },
                              }}
                            >
                              {number}
                            </Box>
                          ))}
                        </Box>






                      </Box>



                      <Box
                        sx={{
                          display: "flex", flexDirection: "column",
                          
                          alignItems: isNonMobileScreens ? "flex-end" : "center",
                        }}>



                        <IconButton
                          onClick={() => handleDeleteCart(item.rifaId)}
                          edge="end"
                          padding="1rem"
                          aria-label="delete"

                          sx={{
                            marginTop: isNonMobileScreens ? "6rem" : "0rem",
                            // Agrega otros estilos necesarios aquí
                          }}                        >
                          <DeleteIcon />
                        </IconButton>
                        <ListItemText

                          primary={
                            <Typography
                              variant="h5"
                              style={{
                                color: "#423E3F",
                                textAlign: "right",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                alignItems: "flex-end",
                                marginTop: isNonMobileScreens ? "8rem" : "1rem",
                                padding:isNonMobileScreens ? "0rem":"1rem",

                                fontWeight: "bold",
                              }}

                            >

                              Subtotal: ${item.numbers.length * item.numbersPrice}


                            </Typography>
                          }
                          style={{ textAlign: "right" }}
                        />


                      </Box>

                    </Box>
                  </Box>
                </ListItem>
              </CSSTransition>
            ))
        ) : (


          <Typography
            variant="body1"
            align="center"
            color="textSecondary"
            style={{ margin: "1em 0" }}
          >
            Sin items
          </Typography>
        )}
      </TransitionGroup>

 
      {cart.length > 0 && (
        <Box
          width={isNonMobileScreens?"50rem":"0"}
          marginTop="3rem"

          marginBottom="1rem"
          display="flex" 
           marginLeft={isNonMobileScreens ? "15rem" : "0rem"}
          flexDirection="column"
          alignItems={isNonMobileScreens ? "flex-end" : "center"}
        >
          <Box
            sx={{
              background: "#D9D9D9",
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: isNonMobileScreens ? "flex-end" : "center",
              justifyContent: "flex-end",
              width: isNonMobileScreens ? "50rem" : "15rem",
              padding:isNonMobileScreens ? "0rem":"1rem",
             }}
          >
            <Typography
              variant="h4" 
              sx={{ color: "#423E3F", fontWeight: "bold"     }}
            >
              Total: {" $" + cart.reduce((acc, item) => acc + item.numbersPrice, 0)}
            </Typography>

            <Button
              variant="contained"
              sx={{
                 
                fontSize: "1.05rem",
                borderRadius: "40px",
                color: "#423E3F",
                fontWeight: "700",
                backgroundColor: "#D68E30",
                "&:hover": {
                  backgroundColor: "#630014",
                },
                marginTop: "1rem",
              }}
              onClick={() => {
                handleBuyClick();
              }}
            >
              COMPRAR
            </Button>
          </Box>

          {preferenceId && <Wallet initialization={{ preferenceId }} />}
        </Box>
      )}
    </Box>
  );
};

export default ShopCart;
