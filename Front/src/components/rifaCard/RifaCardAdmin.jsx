import React from 'react';
import { Box, Button, Divider, Grid, IconButton, Typography } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from 'react';
import axios from 'axios';
//-------------------- Assets --------------------------
import cardImg from '../../assets/cardImg.webp';
const host = import.meta.env.VITE_SV_HOST;
//////////////////////////////////
 

const RifaCardAdmin = ({ rifa ,handleNow}) => {
  const onDelete = async (rifaId) => {
  
    try {
      const res = await axios.delete(`${host}/rifas/deleteRifa/${rifaId}`  );
      console.log(res);
      handleNow()
    } catch (error) {
      console.error(error);
    }
  };

  

    return (
      <Box
                    sx={{
                      
                       background: "#423E3F" ,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",

                      borderRadius: 2,
                      margin: "1rem",
                      display: "flex",

                      flexDirection: "column",
                      justifyContent: "center",
                      
                      paddingRight: "0.7rem", // Añade un poco de espacio en la parte inferior
                      paddingTop: "1.1rem", // Añade un poco de espacio en la parte inferior
height: '125px',
                    }}
                  > 
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',

            }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',


                }}> 
            
            <Grid container spacing={0} display="flex" >
                    <Grid
                      item
                       xs={12}
                       sm={3}
                      // container
                      display="flex"
                      justifyContent="center"
                      alignItems="center"  
                    >
                      
                      <Typography variant="h4">
                        
                      <img
    src={rifa.imgProduct}
    alt={rifa.product}
    style={{
     width: '93px',
     height: '93px',
     
     marginBottom: '1rem',
    //  boxShadow: '8px 8px 8px 8px rgba(0.75,0.75,0.75,0.75)',
     borderRadius: 10,
    //  borderColor: '#423E3F',
        // borderStyle: 'solid',
        // borderWidth: '6px',

    }}/>
                        </Typography>
                    </Grid>
                  
                    <Grid
                      item
                        xs={12}
                       sm={3}
                      // container
                      display="flex"
                      justifyContent="center"
                      alignItems="center"  
                    >
                      <Typography sx={{ fontSize: '24px',fontWeight:"700",color:"#FFFFFF" }}>{rifa.description}</Typography>
                    </Grid>

                    <Grid
                      item
                       xs={12}
                       sm={2.5}
                      display="flex"
                      justifyContent="center"
                      alignItems="center" 
                    >
                       <Typography sx={{ fontSize: '24px',fontWeight:"700",color:"#FFFFFF"  }}> 

                       ${rifa.numbersPrice}
                       </Typography>
                    </Grid>
                   
                    <Grid
                      item
                       xs={12}
                       sm={3.5}
                      // container
                      display="flex"
                      justifyContent="center"
                      alignItems="center" 
                    >
                      
                      <IconButton
                      onClick={() => onDelete(rifa.id)}
                      edge="end"
                      padding="1rem"
                     
                      aria-label="delete"
                      sx={{ fontSize: '124px',color:"black" }}

                    >
                      <DeleteIcon fontSize="large" />
                    </IconButton> 
                       
                      {/* <Divider sx={{ margin: '1rem 0' }} />  */}
                    </Grid>
                    {/* <Divider sx={{ margin: '1rem 0' }} />  */}
                    
                  </Grid>
                  {/* <Divider sx={{ margin: '1rem 0' }} />  */}
            {/* <Typography sx={{ fontSize: "13px", fontWeight: "600", color: '#423E3F' }}>$ {rifa.totalNumbers}</Typography> */}

        </Box>    
        {/* <Divider sx={{ margin: '1rem 0' }} />  */}
  </Box >   </Box>
 );
};

/////////////////////

export default RifaCardAdmin;
