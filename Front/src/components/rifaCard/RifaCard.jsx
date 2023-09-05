import React from 'react';
import { Box, Typography } from '@mui/material';

//-------------------- Assets --------------------------
import cardImg from '../../assets/cardImg.webp';

//////////////////////////////////
const RifaCard = ({ rifa }) => {
    const textStyle = {
        fontFamily: 'Work Sans, sans-serif', // Define la fuente "Work Sans" y proporciona alternativas genéricas.
      };
 return (
  <Box
   sx={{
    width: '230px',
    height: '282px',
    background:"#D9D9D9",
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    borderRadius: 6,
    
    padding: '1rem',
    textAlign: 'center',
    transition: '0.3s',
    '&:hover': {
     boxShadow: ' 0px 5px 61px 6px #D9D9D9',
    },
   }}>
    
   <Typography
    variant='body1' // HACER RESPONSIVE CARD
    fontSize='1.4rem'  
    textOverflow='ellipsis'
    style={{ color: '#423E3F', 
    fontWeight:"600" ,...textStyle
//     backgroundColor: 'rgba(0, 0, 0, 0.5)' 
}}
paddingBottom="0.5rem"
    >
    {rifa.product}  
   </Typography>
  
   <img
    src={rifa.imgProduct}
    alt={rifa.product}
    style={{
     width: '172px',
     height: '178px',
     
     marginBottom: '1rem',
    //  boxShadow: '8px 8px 8px 8px rgba(0.75,0.75,0.75,0.75)',
     borderRadius: 10,
    //  borderColor: '#423E3F',
        // borderStyle: 'solid',
        // borderWidth: '6px',

    }}
   />
        <Typography sx={{fontSize:"1rem", ...textStyle,fontWeight:"600", color:'#423E3F'}}>$ {rifa.numbersPrice}</Typography>  

  </Box>
 );
};

/////////////////////

export default RifaCard;
