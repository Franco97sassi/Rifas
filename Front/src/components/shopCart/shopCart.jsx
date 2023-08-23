import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

import { removeNumbersToCart, buyRifas } from "../../store/state/actions/rifas";
import "./shopCart.css"; // Importa el archivo CSS para las transiciones
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
const host = import.meta.env.VITE_SV_HOST;

const ShopCart = ({isUserAdmin}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.rifas.cart);

  const handleDeleteCart = (rifaId) => {
    dispatch(removeNumbersToCart(rifaId));
  };



  //mercado pago
  const [preferenceId, setPreferenceId] = useState(null);
  initMercadoPago("TEST-b3944798-0320-4a5f-9f12-f95c52c42fd5");

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
        }else{
        const initPoint = response.data.response.body.sandbox_init_point

        console.log("soy initPoint", initPoint)
         window.location.href = initPoint}
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
      flexDirection="column"
      alignItems="center"
      width="80%" // Añadido para reducir el ancho del componente
      margin="0 auto" // Centra el componente horizontalmente
      padding="2rem" 
      >
      <Typography
        margin="1em"
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
                <ListItem>
                  <Box
                    sx={{
                      // width: "230px",
                      // height: "282px",
 
                      background: "#D9D9D9",
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      borderRadius: 2,
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
                      width: "50rem",
                      height: "282px",
                      background: "#D9D9D9",
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      borderRadius: 2,
                      margin: "1rem",
                      display: "flex",
                      flexDirection: "row",
                      paddingRight: "0.7rem", // Añade un poco de espacio en la parte inferior
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
                        paddingLeft={5}

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
                        }}
                      >
                        {item.numbers.map((number) => (
                          
                          <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          width="46px
                          "
                          height="46px
                          " 
                          fontFamily="Work Sans, sans-serif"
                          fontWeight="700"
                          fontSize="20px"             borderRadius="50%"

                          backgroundColor= 
                                 '#423E3F'
                            color="white"
                          margin="0.25rem"
                          >
                         {number}
                        </Box>
                             
                           
                        ))}
                      </Box>
                    </Box>
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
                            paddingTop: "235px",
                            paddingRight: "1rem",
                            fontWeight: "bold",
                          }}

                        >
                          <Box
                          >
                            Subtotal: ${item.numbers.length * item.numbersPrice}
                          </Box>
                        </Typography>
                      }
                      style={{ textAlign: "right" }}
                    />
                    <IconButton
                      onClick={() => handleDeleteCart(item.rifaId)}
                      edge="end"
                      padding="1rem"

                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>{" "}
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
          sx={{
            width:"100%",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-end",
            // marginLeft: "21.0rem",
          }}
        >
          <Box
            sx={{
              width: "50rem",
              height: "65px",
              background: "#D9D9D9",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              borderRadius: 2,
              marginRight: "0.8rem",
              paddingRight: "3.5rem",
              display:"flex",
              justifyContent:"flex-end",
              alignItems:"center" // Alinear verticalmente en el centro
              
            }}
          >
            <ListItemText
              primary={
                <Typography
                  variant="h4"
                  style={{
                    color: "#423E3F",
                    fontWeight: "bold",
                    paddingTop: "20px",
                    paddingLeft: "400px",

                  }}
                >
                  Total:
                  <span
                    children={
                      "$" +
                      cart.reduce((acc, item) => acc + item.numbersPrice, 0)
                    }
                  />
                </Typography>
              }
              style={{ textAlign: "right" }}
            />
          </Box>

          <Button
            variant="contained"
            sx={{
              width: "10rem",
              height: "44px",
              fontSize: "1.05rem",
              borderRadius: "40px",
              color: "#423E3F",
              fontWeight: "700",
              margin: "2em",
              marginRight: "9.5rem",
              backgroundColor: "#D68E30",
              "&:hover": {
                backgroundColor: "#630014",
              },
            }}
            onClick={() => {
              // Realizar acción de compra
              handleBuyClick();
            }}
          >
            COMPRAR
          </Button>

          {preferenceId && <Wallet initialization={{ preferenceId }} />}
        </Box>
      )}
    </Box>
  );
};

export default ShopCart;
