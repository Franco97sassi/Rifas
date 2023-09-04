import React from 'react';
import { Box } from '@mui/material';

import LoginForm from '../../components/loginForm/loginForm';
import NavBar from '../../components/navbar/NavBar.jsx';
import Footer from '../../components/footer/footer';
import '../../index.css'

//////////////////////
const Login = () => {
 return (
  <Box
   sx={{
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
     
   }}
   >
   <NavBar />
   <Box sx={{ flex: '1 1 auto' }}>
    <LoginForm />
   </Box>
   <Footer />
  </Box>
 );
};

export default Login;
