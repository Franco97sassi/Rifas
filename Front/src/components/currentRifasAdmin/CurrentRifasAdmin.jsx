import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Grid, Box } from '@mui/material';


//-------------------- Actions --------------------------
import { getRifas } from '../../store/state/actions/rifas';

//-------------------- Components --------------------------
import RifaCard from '../rifaCard/RifaCard';
import { Link } from 'react-router-dom';
import RifaCardAdmin from '../rifaCard/RifaCardAdmin';


/////////////////////////////
const CurrentRifasAdmin = () => {
 const dispatch = useDispatch();

 const { allRifas } = useSelector((state) => state.rifas);
 console.log(allRifas);

 useEffect(() => {
  dispatch(getRifas());
 }, []);

 //  console.log(allRifas);
const handleNow=()=>{
   dispatch(getRifas())
}


 return (
    <Box margin='4rem' marginTop='0.1rem' padding='0.1rem'>
    <Grid container spacing={2}   display="flex"  flexDirection="column" justifyContent="spaceBetween"    
 alignItems="spaceBetween" >
   <Box
     margin='2rem'
     boxShadow='12px 12px 12px -5px rgba(0,0,0,0.75)'
     borderRadius='0.5rem'
     padding='3em'
      
      gap="2em"
      // flexDirection='row'
     sx={{
      }}> 
      {allRifas.map((rifa) => (
            
      
        <Grid item key={rifa.id}   >
          <RifaCardAdmin rifa={rifa} handleNow={handleNow} />
        </Grid>
      ))} </Box>
    </Grid>
  </Box>
 );
};

export default CurrentRifasAdmin;