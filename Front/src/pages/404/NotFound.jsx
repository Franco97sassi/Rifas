import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

//-------------------- Assets --------------------------
import Logo from '../../assets/FooterLogo.svg';

//////////////////////////
const NotFound = () => {
 const theme = useTheme();
 const alt = theme.palette.background.alt;
 // console.log("gola")
 return (
  <Box sx={{ backgroundColor: alt, height: '100vh' }}>
   <Box
    sx={{ background: alt, padding: '2rem' }}
    display='flex'
    justifyContent='center'>
    <Typography
     sx={{
      marginTop: '3em',
      display: 'flex',
      color: 'white',
      textAlign: 'center',
      fontSize: '40px',
      width: '100%',
      justifyContent: 'center',
     }}>
     404 - Página no encontrada
    </Typography>
   </Box>
   <Box
    sx={{ background: alt, margin: '5em' }}
    display={'flex'}
    justifyContent={'center'}>
    <img
     src={Logo}
     height='100vh'
     alt='No se encontro la imagen'
    />
   </Box>
   <Box
    sx={{ background: alt }}
    display={'flex'}
    justifyContent={'center'}>
    <Link to='/'>
     <Button
      variant='contained'
      sx={{
       width: '200px',
       height: '60px',
       fontSize: '1.2rem',
       margin: '2em',
       backgroundColor: '#9e0423',
       '&:hover': {
        backgroundColor: '#630014',
       },
      }}>
      Volver a Home
     </Button>
    </Link>
   </Box>
  </Box>
 );
};

export default NotFound;
