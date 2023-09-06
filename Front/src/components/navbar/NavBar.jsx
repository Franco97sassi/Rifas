import React, { useState } from 'react';
import {
  Box,
  IconButton,
  ListItemText,
  Typography,
  ListItem,
  List,
  useTheme,
  useMediaQuery,
  Drawer,
  AppBar,
  Slide,
  CssBaseline,
  FormControl,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Close,
  Menu as MenuHamb,
  AccountCircleRounded,
  LocalPlay,
} from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';

import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
// import { useDispatch, useSelector } from 'react-redux';
// import { setMode } from '../../app/state/slices/modeSlice';
import { useNavigate, Link as RouterLink, Link, NavLink } from 'react-router-dom';
import '../../index.css'

//-------------------- Assets --------------------------
import UserIcon from './userIcon';
import UserIconNoLogged from './userIconNoLogged';
import venado from '../../assets/venado.png';
import UserIconAdmin from './userIconAdmin';
/////////////////////////
const NavBar = ({ isUserAdmin }) => {
  // e.preventDefault(); // Evita el comportamiento predeterminado del navegador

  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  //  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

  const handleOpenMenu = (e) => {
     e.preventDefault(); // Evita el comportamiento predeterminado del navegador

    setIsMobileMenuToggled(true);
  };

  const handleCloseMenu = () => {
    setIsMobileMenuToggled(false);
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const theme2 = createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          a {
            text-decoration: none !important;
          }
        `,
      },
    },
  });
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const font = theme.palette.others.font;
  const theme1 = useTheme();
  const isNonMobileScreens2 = useMediaQuery(theme1.breakpoints.up('md')); // Cambio de 'min-width' a 'up'

  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
 
  return (
    <>
      {userData ? (
        // User Logged Navbar
        <AppBar position='static'>
          <CssBaseline />

          {/* despues de iniciar sesion */}
          <Box
            display='flex'
            justifyContent='space-between'

            alignItems='center'
            bgcolor={alt}>
            <Box
              display='flex'

              justifyContent='center'
              alignItems='center'
              height='75px'
            >
              <Box sx={{
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Typography
                  fontWeight='bold'
                  fontSize='clamp(1rem, 2rem, 2.25rem)'
                  color='primary'
                  onClick={() => navigate('/home')}
                  sx={{
                    '&:hover': {
                      transition: '0.4s',
                      backgroundColor: dark,
                      cursor: 'pointer',
                      borderRadius: '15px',

                    },
                  }}>
                  {isNonMobileScreens ? (
                    <img
                      src={venado}
                      alt='img not found'
                      width='max-width'
                      height="50px"
                    />
                  ) : (
                    <>
                      <img
                        src={venado}
                        alt='img not found'
                        width='max-width'
                        height="50px"

                      />



                    </>
                  )}
                </Typography>
              </Box></Box>


            {/* DESKTOP NAV */}

            {isNonMobileScreens ? (
              <Box
                display='flex'

                justifyContent='flex-end'
                alignItems='center'
                gap='0.1rem'
                height='75px'
              //  paddingLeft='1000px'
              >


                <RouterLink to='/cart'>
                  <IconButton>
                    {/* <ShoppingBasketIcon sx={{ color: font, fontSize: '25px' }} /> */}
                    <Typography sx={{
                      // paddingLeft: '1000px'
                      // ,
                      color: font, fontSize: "15px", fontWeight: "1000", letterSpacing: '2px',
                    }}>   CARRITO

                    </Typography>
                  </IconButton>
                </RouterLink>



                {isUserAdmin &&
                  <RouterLink to='/admin'>

                    <IconButton>

                    </IconButton>
                  </RouterLink>
                }
                <UserIcon
                  onLoginClick={handleLoginClick}
                  onRegisterClick={handleRegisterClick}
                />

              </Box>
            ) : (
              <IconButton onClick={handleOpenMenu}>
                <MenuIcon
                />              </IconButton>
            )}




            {/* MOBILE NAV */}
            {!isNonMobileScreens

              && isMobileMenuToggled && (


                <Drawer
                  anchor='right'
                  open={isMobileMenuToggled}
                  onClose={handleCloseMenu}
                  TransitionComponent={Slide}
                // TransitionProps={{
                //   direction: 'left',
                //    timeout: { enter: 5500, exit: 5500 },
                //   }}
                // Usa la propiedad ModalProps para permitir la interacción táctil
                ModalProps={{
                  disableScrollLock: true,
                  disableBackdropClick: true,
                  disableEscapeKeyDown: true,
                }}
                >
                  <Box
                    // position='fixed'
                    right='0'
                    bottom='0'
                    height='100%'
                    // zIndex='10'
                    maxWidth='31.25rem'
                    minWidth='15.63rem'
                    backgroundColor={alt}>
                    {/* CLOSE ICON */}

                    <Box
                      display='flex'
                      justifyContent='flex-end'
                      p='1rem'>
                      <IconButton onClick={handleCloseMenu}>
                        <Close />
                      </IconButton>


                      {/* MENU ITEMS */}
                    </Box>
                    <Box
                      display='flex'
                      flexDirection='row'
                      justifyContent='center'
                      gap='3rem'
                      // backgroundColor={white}
                      alignItems='center'

                    >
                      <UserIcon
                        onLoginClick={handleLoginClick}
                        onRegisterClick={handleRegisterClick}


                      />
                      <RouterLink to='/cart'>
                        <IconButton>
                          <ShoppingBasketIcon sx={{ color: font, fontSize: '25px' }} />
                        </IconButton>
                      </RouterLink>
                    </Box>
                  </Box>
                </Drawer>
              )}
          </Box>
        </AppBar>
      ) : (


        // User No Logged Navbar

        <AppBar position='static'>
          {/* antes de iniciar sesion */}

          <CssBaseline />
          <Box
            display='flex'
            justifyContent='space-between'

            alignItems='center'
            height='75px'

            paddingLeft='0px'
            bgcolor={alt}>

            <Box
              display='flex'
              //  justifyContent='space-between'
              alignItems='center'
            // marginLeft={"10px"}
            >

              <Typography
                fontWeight='bold'
                fontSize='clamp(1rem, 2rem, 2.25rem)'
                color='primary'
                onClick={() => navigate('/')}
                sx={{
                  '&:hover': {
                    transition: '0.4s',
                    backgroundColor: dark,
                    cursor: 'pointer',
                    borderRadius: '15px',
                  },

                }}>
                {isNonMobileScreens ? (
                  <img
                    src={venado}
                    alt='img not found'
                    width='max-width'
                    height="50px"
                  />
                ) : (
                  <img
                    src={venado}
                    alt='img not found'
                    width='max-width'
                    height="50px"

                  />
                )}
              </Typography>
            </Box>

            {/* DESKTOP NAV */}

            {isNonMobileScreens ? (
              <Box >

                <Box
                  display='flex'

                  // justifyContent='flex-end'  // Alinea RouterLink a la derecha
                  gap='1rem'
                  alignItems='center'

                >
                  <RouterLink
                    to='/register'
                    style={{ textDecoration: 'none' }}>
                    <Typography sx={{ color: font, fontSize: "15px", fontWeight: "1000", letterSpacing: '2px' }}>REGISTRARME</Typography>
                  </RouterLink>

                  <RouterLink
                    to='/login'
                    style={{ textDecoration: 'none' }}>
                    <Typography sx={{ color: font, fontSize: "15px", fontWeight: "1000", letterSpacing: '2px' }}>INICIAR SESION</Typography>
                  </RouterLink>
                  {/* </Box> */}
                  {/* <Box   display='flex' justifyContent='flex-end'> */}
                  <UserIconNoLogged
                    onLoginClick={handleLoginClick}
                    onRegisterClick={handleRegisterClick}
                  />
                </Box>
              </Box>
            )
              :




              (
                // <IconButton  onTouchStart={handleOpenMenu}>
                //   <MenuHamb />  
                // </IconButton>
                <IconButton
                  // color="black"
                  onClick={handleOpenMenu}
                >
                  <MenuIcon
                  />
                </IconButton>
              )



            }

            {/* MOBILE NAV */}
             {!isNonMobileScreens && isMobileMenuToggled && (
              <Drawer
                anchor='right'
                open={isMobileMenuToggled}
                onClose={handleCloseMenu}
                TransitionComponent={Slide}
                ModalProps={{
                  disableScrollLock: true,
                  disableBackdropClick: true,
                  disableEscapeKeyDown: true,
                }}
                transitionprops={{
                  direction: 'left',
                  timeout: { enter: 500, exit: 500 },
                }}>
                 <Box
                  // position='fixed'
                  right='0'
                  bottom='0'
                  height='100%'
                  // zIndex='10'
                  maxWidth='31.25rem'
                  minWidth='15.63rem'
                  backgroundColor={alt}>  
                  {/* CLOSE ICON */}
                   <Box
                    display='flex'
                    justifyContent='flex-end'
                    p='1rem'>
                    <IconButton onClick={handleCloseMenu}>
                     <Close />  
                      {/* <MenuIcon />       */}
                      </IconButton>
                                    
                  </Box> 

                  {/* MENU ITEMS */}

                  <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='space-between'
                    gap='3rem'

                    alignItems='center'>
                    {/* <UserIconNoLogged
                      onLoginClick={handleLoginClick}
                      onRegisterClick={handleRegisterClick} isUserAdmin={isUserAdmin}
                    /> */}
                    {/* <UserIconNoLogged
                      /> */}
                    {/* <RouterLink to='/register'>
                      <IconButton>
                        <Help sx={{ color: font, fontSize: '25px' }} />
                      </IconButton>
                    </RouterLink> */}
                    {/* <ThemeProvider theme={theme}> */}
                    {/* <CssBaseline /> */}
                    {/* <Box sx={{ display: "flex", flexDirection: "column" }}> */}
                   
                   
                   
                     <NavLink to='/register' style={{ textDecoration: "none", color: "inherit" }}  >
                      <Typography sx={{ color: "orange", fontWeight: "700" }}>Registrarme</Typography>
                    </NavLink >
                    <NavLink to='/login' style={{ textDecoration: "none", color: "inherit" }}>
                      <Typography sx={{ color: "orange", fontWeight: "700" }}>Iniciar Sesión</Typography>
                    </NavLink >
                      
                    
                    
                    {/* </Box>      */}
                    {/* </ThemeProvider>  */}
                  </Box>   
                </Box>
              </Drawer>
            )}
          </Box>
        </AppBar>
      )}
    </>
  );
};

export default NavBar;