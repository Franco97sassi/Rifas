import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';

//-------------------- Actions --------------------------
import { confirmAccount } from '../../store/state/actions/user';

//-------------------- Components --------------------------
import Footer from '../../components/footer/footer';
import NavBar from '../../components/navbar/NavBar';

////////////////////////////////
const ActivateAccount = () => {
 const location = useLocation();
 const searchParams = new URLSearchParams(location.search);
 const token = searchParams.get('token');
 //  console.log(token);
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(confirmAccount(token));
 });

 return (
  <Box
   display='flex'
   flexDirection='column'
   minHeight='100vh'>
   <NavBar />
   <Box
    flex='1'
    display='flex'
    alignItems='center'
    justifyContent='center'>
    <Box
     maxWidth='100vw'
     flexGrow={0.4}
     textAlign='center'
     margin='2rem'
     boxShadow='12px 12px 12px -5px rgba(0,0,0,0.75)'
     borderRadius='0.5rem'
     padding='3em'
     sx={{
      bgcolor: '#d4d4d4',
     }}>
     <Typography
      style={{ color: '#333333' }}
      variant='h2'
      gutterBottom>
      ¡Su cuenta en RifasMX ha sido confirmada exitosamente!
     </Typography>
     <Typography
      style={{ color: '#333333' }}
      variant='h3'
      gutterBottom>
      Inicia sesión para empezar a comprar rifas.
     </Typography>
     <Button
      component={Link}
      to='/login'
      variant='contained'
      color='primary'
      sx={{
       width: '200px',
       height: '60px',
       fontSize: '1rem',
       margin: '2em',
       backgroundColor: '#9e0423',
       '&:hover': {
        backgroundColor: '#630014',
       },
      }}>
      Iniciar sesión
     </Button>
    </Box>
   </Box>
   <Footer />
  </Box>
 );
};

export default ActivateAccount;
