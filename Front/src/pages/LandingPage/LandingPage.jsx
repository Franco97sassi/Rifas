import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, useTheme } from '@mui/material';

//-------------------- Assets --------------------------
import LandingImg from '../../assets/Landing.jpg';

//-------------------- Components --------------------------
 import Footer from '../../components/footer/footer.jsx';
import NavBar from '../../components/navbar/navBar';

/////////////////////
const LandingPage = () => {
 const theme = useTheme();
 const background = theme.palette.background.login;

 return (
  <Box
   sx={{
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: `url(${LandingImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
   }}>
   <NavBar/>
   <Box
    sx={{
     backgroundColor: 'rgba(0, 0, 0, 0.65)',
     display: 'flex',
     flexDirection: 'column',
     justifyContent: 'flex-start',
     alignItems: 'flex-start',
     flex: '1 1 auto',
     paddingLeft: '2em',
 
    }}>
    <Typography
     variant='h1'
     textAlign='center'
     marginTop='2.5em'
      paddingLeft= '0.3em'

     fontSize='4em'
     color='whitesmoke'
     style={{
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
     }}>
     Bienvenidos 
    </Typography>
    
    <Box
     sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '0.1em',
     }}>
     <Link to='/home'>
      <Button
       variant='contained'
       sx={{
        width: '200px',
        height: '40px',
        fontSize: '1rem',
        borderRadius: '2rem',
        marginLeft: '3em',
        marginTop: '0.5em',

        backgroundColor: '#D68E30',
        '&:hover': {
         backgroundColor: '#630014',
        },
       }}>
      ¡Participar!
      </Button>
     </Link>
    </Box>
   </Box>
   <Footer />
  </Box>
 );
};

/////////////////////////////

export default LandingPage;
