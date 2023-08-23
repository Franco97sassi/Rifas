import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const OrdenCard = ({orden}) => {
  return (
    <div>
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
    fontSize='13px'
    textOverflow='ellipsis'
    style={{ color: '#423E3F', 
    fontWeight:"600" ,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)' 
}}
paddingBottom="0.5rem"
    >
    {orden.product}  
   </Typography>
  
   <img
    src={orden.imgProduct}
    alt={orden.product}
    style={{
     width: '100px',
     height: '178px',
     
     marginBottom: '1rem',
    //  boxShadow: '8px 8px 8px 8px rgba(0.75,0.75,0.75,0.75)',
     borderRadius: 10,
    //  borderColor: '#423E3F',
        // borderStyle: 'solid',
        // borderWidth: '6px',

    }}
   />
 
  </Box>
    </div>
  )
}

export default OrdenCard