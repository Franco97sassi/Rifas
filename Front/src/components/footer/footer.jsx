import React from 'react';
import {
 Box,
 Grid,
 useTheme,
 CssBaseline,
 AppBar,
 Typography,
 TextField,
 Button,
 useMediaQuery,
} from '@mui/material';

//-------------------- Assets --------------------------
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FooterLogo from '../../assets/FooterLogo.png';

//////////////////////
const Footer = () => {
 // Falta hacer el mail submit? suscripcion? conversar
 const theme = useTheme();
 const alt = theme.palette.background.alt;
 const background = theme.palette.background.default;
 const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

 return isNonMobileScreens ? (
  /* DESKTOP FOOTER */
  <AppBar
   position='static'
   sx={{
    backgroundColor: alt,
   }}>
   <CssBaseline />
   <Grid
    container
    justifyContent='space-between'
    alignItems='center'
    padding='0.5rem'>
    <Grid
     item
     xs={3.5}
     display='flex'
     gap='1rem'>
     {/* <InstagramIcon />
     <LinkedInIcon /> */}
    </Grid>
    <Grid
     item
     display='block'
     padding='0.5rem'
     borderRadius='25px'>
     <img
      src={FooterLogo}
      width='100rem'
     />
    </Grid>
    <Grid
     item
     xs={3.5}
     container
     justifyContent='center'>
     <Grid
      item
      display='grid'
      justifyItems='center'
      flexWrap='nowrap'>
     
     </Grid>
     <Grid
      item
      display='flex'
      marginTop='1rem'>
      
     </Grid>
    </Grid>
   </Grid>
  </AppBar>
 ) : (
  /* MOBILE FOOTER */
  <AppBar
   position='static'
   sx={{
    backgroundColor: alt,
   }}>
   <CssBaseline />
   <Box
    display='grid'
    margin='2rem'
    justifyItems='center'
    gap='1rem'
    padding='1rem'>
    <Box
     display='block'
     padding='0.5rem'
     borderRadius='25px'>
     <img
       width='100rem'
      src={FooterLogo}
     />
    </Box>
    {/* <Box
     display='grid'
     margin='1rem'
     justifyItems='center'>
     <Box margin='2rem'>
      <Typography align='center'>
       ¿Querés saber más sobre las novedades de RifasMX?
      </Typography>
      <Typography align='center'>Dejanos tu Mail</Typography>
     </Box> */}
     {/* <Box
      display='flex'
      marginTop='1rem'>
      <TextField
       label='Ingrese su Mail'
       size='small'
       variant='standard'
       InputLabelProps={{
        style: {
         color: 'white',
        },
       }}
      />
      <Button variant='filled'>Suscríbete</Button>
     </Box> */}
    {/* </Box> */}
    {/* <Box
     margin='1rem'
     display='flex'
     gap='1.5rem'>
     <InstagramIcon />
     <LinkedInIcon />
    </Box> */}
   </Box>
  </AppBar>
 );
};

export default Footer;
