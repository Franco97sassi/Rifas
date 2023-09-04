import React from 'react';
import { Box } from '@mui/material';

import NavBar from '../../components/navbar/NavBar.jsx';
import Footer from '../../components/footer/footer';
import RegisterForm from '../../components/registerForm/registerForm';
import '../../index.css'

////////////////////////
const Register = () => {
 return (
  <Box
   sx={{
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
   }}>
   <NavBar />
   <Box sx={{ flex: '1 1 auto' }}>
    <RegisterForm />
   </Box>
   <Footer />
  </Box>
 );
};

export default Register;
