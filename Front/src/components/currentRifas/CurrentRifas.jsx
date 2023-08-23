import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Grid, Box } from '@mui/material';


//-------------------- Actions --------------------------
import { getRifas } from '../../store/state/actions/rifas';

//-------------------- Components --------------------------
import RifaCard from '../rifaCard/RifaCard';
import { Link } from 'react-router-dom';


/////////////////////////////
const CurrentRifas = () => {
 const dispatch = useDispatch();

 const { allRifas } = useSelector((state) => state.rifas);
 console.log(allRifas);

 useEffect(() => {
  dispatch(getRifas());
 }, []);

 //  console.log(allRifas);



 return (
  <Box>
   <Box
    margin='4rem'
    marginTop='0.1rem'
    padding='0.1rem'
    maxWidth="100%"
    
    >
         
    <Typography
     margin='0.1em'
     textAlign='center'
     gutterBottom
    
     borderRadius='0.5em'
     fontWeight='bold'
     letterSpacing='0.1em'
     fontSize="28px"
     color='#433F40'
     variant='h1'>
        Rifas todas las semanas,prueba y gana!
    
        </Typography>

    <Grid
     margin='0'
     padding='0'
     justifyContent='center'
     container
     columnSpacing={{ xs: 2, sm: 2, md: 4 }}>
     {allRifas.map((rifa) => (
      <Grid
       item
       margin='1.5em'
       
       key={rifa.id}>
       <Link
        style={{ textDecoration: 'none' }}
        to={`/rifa/${rifa.id}`}>
        <RifaCard rifa={rifa} />
       </Link>
      </Grid>
     ))}
    </Grid>
   </Box>
  </Box>
 );
};

export default CurrentRifas;