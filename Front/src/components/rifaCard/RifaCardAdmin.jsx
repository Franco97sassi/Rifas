import React from 'react';
import { Box, Button, Divider, Grid, IconButton, Typography } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from 'react';
import axios from 'axios';
import "../../index.css"
//-------------------- Assets --------------------------
import cardImg from '../../assets/cardImg.webp';
const host = import.meta.env.VITE_SV_HOST;
//////////////////////////////////
 

const RifaCardAdmin = ({ rifa, handleNow }) => {
  const onDelete = async (rifaId) => {
    try {
      const res = await axios.delete(`${host}/rifas/deleteRifa/${rifaId}`);
      // console.log(res);
      handleNow();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
    sx={{
      background: "rgba(66, 62, 63, 0.72)",
      borderRadius: 2,
        margin: "1rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
       padding: '1rem', // Añade un espaciado uniforme
      maxWidth: '100%', // Limita el ancho máximo
    }}
  >

      <Grid container spacing={0}>

          <Grid item xs={12} sm={3}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={rifa.imgProduct}
              alt={rifa.product}
              style={{
                width: '93px',
                height: '93px',
                marginBottom: '1rem',
                borderRadius: 10,
              }}
            />
          </Box>
        </Grid>  
 
        <Grid item xs={12} sm={3} container alignItems="center" justifyContent="center">
          <Box  >
            <Typography sx={{ fontFamily: "Work Sans",fontSize: '24px', fontWeight: "700", color: "#FFFFFF" }}>{rifa.product}</Typography>
          </Box>
        </Grid> 

         <Grid item xs={12} sm={3} container alignItems="center" justifyContent="center">
          <Box  >
            <Typography sx={{ fontFamily: "Work Sans",fontSize: '24px', fontWeight: "700", color: "#FFFFFF" }}>
              ${rifa.numbersPrice}
            </Typography>
          </Box>
        </Grid>  
        
     <Grid item xs={12} sm={3} container alignItems="center" justifyContent="center">
          <Box >
            <IconButton
              onClick={() => onDelete(rifa.id)}
              edge="end"
              padding="1rem"
              aria-label="delete"
              sx={{ fontSize: '64px', color: "black" }}
            >
              <DeleteIcon fontSize="large" />
            </IconButton>
          </Box>
        </Grid>  

      </Grid>
    </Box>
  );
};

export default RifaCardAdmin;