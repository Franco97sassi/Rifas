
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button, Grid, useMediaQuery, Autocomplete, TextField, Pagination } from '@mui/material';
 import Stack from '@mui/material/Stack';
//-------------------- Actions --------------------------
import { addNumbersToCart } from '../../store/state/actions/rifas';
import { useTheme } from '@emotion/react';

import { getRifaDetail } from '../../store/state/actions/rifas';
//-------------------- Components --------------------------
import '../../index.css'

// implementar precio

///////////////////////////////
const RifaDetailCard = ({ rifaDetail }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(rifaDetail);
  const [searchTerm, setSearchTerm] = useState("");

  /* Parte del Responsive del texto */

  //  const isSmallScreen = useMediaQuery('(max-width: 1550px)');
  //  const isExtraSmallScreen = useMediaQuery('(max-width: 1200px)');
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isExtraSmallScreen = useMediaQuery((theme) =>
    theme.breakpoints.down('xs')
  );
  let typographyVariant = 'h4';
  let imgSize = { width: '30rem' };

  if (isSmallScreen) {
    typographyVariant = 'h5';
    imgSize.width = '25rem';
  } else if (isExtraSmallScreen) {
    typographyVariant = 'h6';
    imgSize.width = '20rem';
  }

 
  const handlePageChange = (event, value) =>{
    dispatch(getRifaDetail(rifaDetail?.rifa?.id,value,""))
    setPage(value)
  }

  const handleSearch = (e) => {
    if (searchTerm.trim() !== '') {
      dispatch(getRifaDetail(rifaDetail?.rifa?.id, 1, searchTerm));
      setPage(1);
    }
  };

  const handleSearchChange = (event) => {
    //setSearchQuery(event.target.value); // Actualiza el estado de búsqueda
    dispatch(getRifaDetail(rifaDetail?.rifa?.id,1,event.target.value));
    setPage(1)
  };

  /* Compra Rifas action */
  const [selectedNumbers, setSelectedNumbers] = useState([]);

  const handleNumberClick = (number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((num) => num !== number));
    } else {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };


  const addToCart = (selectedNumbers) => {
    if (selectedNumbers.length === 0) {
      // Mostrar un mensaje de error o realizar alguna acción aquí
     } else {
    dispatch(
      addNumbersToCart(
        selectedNumbers,
        rifaDetail?.rifa?.id,
        rifaDetail?.rifa?.numbersPrice,
        rifaDetail?.rifa?.product,
        rifaDetail?.rifa?.imgProduct,
      ),
    );
    setSelectedNumbers([]);
    navigate('/cart');
  } };

  // Ordenar los números en función de su valor
  const sortedNumeros = [...rifaDetail?.rifa?.numeros].sort(
    (a, b) => a.number - b.number,
  );
  // console.log(rifaDetail)
  const filteredNumeros = sortedNumeros.filter(element =>
    element.number.toString().includes(searchTerm)
  );
// console.log("filteredN",filteredNumeros);

  const theme1 = useTheme();
  // const isNonMobileScreens = useMediaQuery(theme1.breakpoints.up('md')); // Cambio de 'min-width' a 'up'
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

  const [page, setPage] = useState(1);
  
 
      return (
    <>
      {Object.keys(rifaDetail?.rifa).length > 0 ? (
        /// TIENE QUE IR CON RESPONSIVE

        <Box
          margin='2rem'
          boxShadow='12px 12px 12px -5px rgba(0,0,0,0.75)'
          borderRadius='0.5rem'
          padding='3em'
          display='flex'
          flexDirection={isNonMobileScreens ? "row" : "column"}
          justifyContent="center"
          alignItems={isNonMobileScreens ? "flex-start" : "center"}
          gap="2em"
          sx={{
            bgcolor: '#FFFFFF',
          }}>

          <Box
            display='flex'
            // gap="7em"
            
            flexDirection="column">
            <Typography
              variant='h1' fontWeight="700"
              
              style={{fontFamily: 'Work Sans', color: '#333333', textAlign: 'center' }}>
              Finalizar
            </Typography>


            <Box
              sx={{
                width: '230px',
                height: '282px',
                background: "#D9D9D9",
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                borderRadius: 6,
                marginTop: '11em',

                padding: '1rem',
                textAlign: 'center',
                transition: '0.3s',
                // '&:hover': {
                //  boxShadow: ' 0px 5px 61px 6px #FFA840',
                // },
              }}>



              <Typography
                variant='body1' // HACER RESPONSIVE CARD
                fontSize='1.4rem'
                textOverflow='ellipsis'
                style={{fontFamily: 'Work Sans',
                  color: '#423E3F',
                      // backgroundColor: 'rgba(0, 0, 0, 0.5)' 
                }}>
                {rifaDetail?.rifa?.product}
              </Typography>

              <img
                src={rifaDetail?.rifa?.imgProduct}
                alt={rifaDetail?.rifa?.product}
                style={{
                  width: '172px',
                  height: '178px',

                  marginBottom: '1rem',
                  borderRadius: 10,


                }}
              />
              <Typography sx={{ fontSize: "1rem", fontWeight: "600", color: "#423E3F" }}>$ {rifaDetail?.rifa?.numbersPrice}</Typography>

            </Box>

            <Box


              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                marginTop:"2.25rem",
                borderRadius: '20px',
                bgcolor: '#D9D9D9',
                height: "70px",
                width: "224px",
              }}>

              <Typography
                variant='h6'

                style={{ color: '#333333', textAlign: 'center', fontWeight: "700", fontSize: "20px",fontFamily: 'Work Sans', }}>
                Valor por número
              </Typography>
              <Typography
                variant='h6'

                style={{ color: '#333333', textAlign: 'center', fontWeight: "700", fontSize: "1rem",fontFamily: 'Work Sans' }}>
                ${rifaDetail?.rifa?.numbersPrice}
              </Typography>
            </Box></Box>

          <Box>
            <Typography
              variant='h1'
              marginTop='0em'
              textAlign= {isNonMobileScreens ? "center" : "center"} 
              fontWeight="700"
              style={{ fontFamily: 'Work Sans',color: '#333333' }}>
              Números Disponibles
            </Typography>
            <Typography
              variant='h4'
              margin='10px'
              marginTop='3rem'
              fontWeight="700"

              style={{ fontFamily: 'Work Sans',color: '#33333', textAlign: 'center' }}>
              Selecciona los números que desees comprar
            </Typography>
            <Box
              sx={{
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: isNonMobileScreens ? 'flex-start' : 'center',
              }}
            >

<TextField
      type="text"
      placeholder="Buscar número"
      //value={searchTerm}
      onChange={handleSearchChange}
    />
            </Box>


            <Box

              sx={{
                borderRadius: '0.5rem',
                padding: '2em',
                bgcolor: '#D9D9D9', overflowY: 'scroll',  // Habilitar el scroll vertical
                height: '30rem',
                width:isNonMobileScreens?"60rem":"100%",
                overflowX: 'hidden',
              }}>
              <Grid
                container
                justifyContent='center'

                spacing={0}>
                {filteredNumeros.map((element) => (
                  <Grid item key={element.number}>
                    {/* Botón para mostrar el número */}
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      width="46px
            "
                      height="46px
            "
                      fontFamily="Work Sans, sans-serif"
                      fontWeight="700"
                      fontSize="15px"
                      color={
                        selectedNumbers.includes(element)
                          ? '#070707                '
                          : element.available
                            ? '#D9D9D9'
                            : '#070707'
                      }
                      borderRadius="50%"
                      backgroundColor={
                        selectedNumbers.includes(element)
                          ? '#004F81                '
                          : element.available
                            ? '#423E3F'
                            : '#3336'
                      }
                      margin="0.25rem"
                      opacity={!element.available ? 0.5 : 1}
                      cursor={element.available ? 'pointer' : 'not-allowed'}
                      onClick={() => element.available && handleNumberClick(element)}>
                      {element.number}
                    </Box>
                     
                  </Grid>
                ))}
 
              </Grid>


              {/* <Stack spacing={2}> */}
   <Pagination
            count={rifaDetail && rifaDetail.rifa ? rifaDetail.pagination.totalPages : 0}
            page={page}
            onChange={handlePageChange}
            sx={{display:"flex", justifyContent:"center", marginBottom:"200px"}}
            />


{/* </Stack>  */}

            </Box>
            <Box
              width='100%'
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}>
              <Button
                variant='contained'
                sx={{
                  width: '186px',
                  height: '44px',
                  fontWeight: '700',
                  margin: '2em',
                  fontSize: "14px",
                  color: "#423E3F",
                  borderRadius: '20px',
                  backgroundColor: '#D68E30',
                  '&:hover': {
                    backgroundColor: '#630014',
                  },
                }}
                onClick={() => {
                  // Realizar acción con los números seleccionados
                  addToCart(selectedNumbers);
                   
                }}>Agregar al Carrito

              </Button>
            </Box>
           
          </Box>
        </Box>
      ) : (
        <Typography>Rifa no encontrada</Typography>
      )}
    </>
  );
};

//////////////////////////////

export default RifaDetailCard;






































// import React from 'react';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { Box, Typography, Button, Grid, useMediaQuery, Autocomplete, TextField, Pagination } from '@mui/material';
//  import Stack from '@mui/material/Stack';
// //-------------------- Actions --------------------------
// import { addNumbersToCart } from '../../store/state/actions/rifas';
// import { useTheme } from '@emotion/react';

// //-------------------- Components --------------------------

// // implementar precio

// ///////////////////////////////
// const RifaDetailCard = ({ rifaDetail }) => {

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   console.log(rifaDetail);
//   const [searchTerm, setSearchTerm] = useState("");

//   /* Parte del Responsive del texto */

//   //  const isSmallScreen = useMediaQuery('(max-width: 1550px)');
//   //  const isExtraSmallScreen = useMediaQuery('(max-width: 1200px)');
//   const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
//   const isExtraSmallScreen = useMediaQuery((theme) =>
//     theme.breakpoints.down('xs')
//   );
//   let typographyVariant = 'h4';
//   let imgSize = { width: '30rem' };

//   if (isSmallScreen) {
//     typographyVariant = 'h5';
//     imgSize.width = '25rem';
//   } else if (isExtraSmallScreen) {
//     typographyVariant = 'h6';
//     imgSize.width = '20rem';
//   }

//   /* Compra Rifas action */
//   const [selectedNumbers, setSelectedNumbers] = useState([]);

//   const handleNumberClick = (number) => {
//     if (selectedNumbers.includes(number)) {
//       setSelectedNumbers(selectedNumbers.filter((num) => num !== number));
//     } else {
//       setSelectedNumbers([...selectedNumbers, number]);
//     }
//   };


//   const addToCart = (selectedNumbers) => {
//     dispatch(
//       addNumbersToCart(
//         selectedNumbers,
//         rifaDetail.id,
//         rifaDetail.numbersPrice,
//         rifaDetail.product,
//         rifaDetail.imgProduct,
//       ),
//     );
//     setSelectedNumbers([]);

//   };

//   // Ordenar los números en función de su valor
//   const sortedNumeros = [...rifaDetail.numeros].sort(
//     (a, b) => a.number - b.number,
//   );
//   console.log(rifaDetail)
//   const filteredNumeros = sortedNumeros.filter(element =>
//     element.number.toString().includes(searchTerm)
//   );


//   const theme1 = useTheme();
//   const isNonMobileScreens = useMediaQuery(theme1.breakpoints.up('md')); // Cambio de 'min-width' a 'up'
  
//   // const [page, setPage] = useState(1);
  
 
//       return (
//     <>
//       {Object.keys(rifaDetail).length > 0 ? (
//         /// TIENE QUE IR CON RESPONSIVE

//         <Box
//           margin='2rem'
//           boxShadow='12px 12px 12px -5px rgba(0,0,0,0.75)'
//           borderRadius='0.5rem'
//           padding='3em'
//           display='flex'
//           flexDirection={isNonMobileScreens ? "row" : "column"}
//           justifyContent="center"
//           alignItems={isNonMobileScreens ? "flex-start" : "center"}
//           gap="2em"
//           sx={{
//             bgcolor: '#FFFFFF',
//           }}>

//           <Box
//             display='flex'
//             gap="7em"

//             flexDirection="column">
//             <Typography
//               variant='h1' fontWeight="700"

//               style={{ color: '#333333', textAlign: 'center' }}>
//               Finalizar
//             </Typography>


//             <Box
//               sx={{
//                 width: '230px',
//                 height: '282px',
//                 background: "#D9D9D9",
//                 backgroundSize: 'contain',
//                 backgroundPosition: 'center',
//                 backgroundRepeat: 'no-repeat',
//                 borderRadius: 6,
//                 marginTop: '4em',

//                 padding: '1rem',
//                 textAlign: 'center',
//                 transition: '0.3s',
//                 // '&:hover': {
//                 //  boxShadow: ' 0px 5px 61px 6px #FFA840',
//                 // },
//               }}>



//               <Typography
//                 variant='body1' // HACER RESPONSIVE CARD
//                 fontSize='1epx'
//                 textOverflow='ellipsis'
//                 style={{
//                   color: '#423E3F',
//                   fontWeight: "600"    // backgroundColor: 'rgba(0, 0, 0, 0.5)' 
//                 }}>
//                 {rifaDetail.product}
//               </Typography>

//               <img
//                 src={rifaDetail.imgProduct}
//                 alt={rifaDetail.product}
//                 style={{
//                   width: '172px',
//                   height: '178px',

//                   marginBottom: '1rem',
//                   borderRadius: 10,


//                 }}
//               />
//               <Typography sx={{ fontSize: "13px", fontWeight: "600", color: "#423E3F" }}>$ {rifaDetail.numbersPrice}</Typography>

//             </Box>

//             <Box


//               sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'space-evenly',
//                 alignItems: 'center',

//                 borderRadius: '20px',
//                 bgcolor: '#D9D9D9',
//                 height: "70px",
//                 width: "224px",
//               }}>

//               <Typography
//                 variant='h6'

//                 style={{ color: '#333333', textAlign: 'center', fontWeight: "700", fontSize: "20px" }}>
//                 Valor por número
//               </Typography>
//               <Typography
//                 variant='h6'

//                 style={{ color: '#333333', textAlign: 'center', fontWeight: "700", fontSize: "15px" }}>
//                 ${rifaDetail.numbersPrice}
//               </Typography>
//             </Box></Box>

//           <Box>
//             <Typography
//               variant='h1'
//               marginTop='0em'
//               textAlign= {isNonMobileScreens ? "left" : "center"} 
//               fontWeight="700"
//               style={{ color: '#333333' }}>
//               Números Disponibles
//             </Typography>
//             <Typography
//               variant='h4'
//               margin='10px'
//               marginTop='3rem'
//               fontWeight="700"

//               style={{ color: '#33333', textAlign: 'center' }}>
//               Selecciona los números que desees comprar
//             </Typography>
//             <Box
//               sx={{
//                 marginBottom: '1rem',
//                 display: 'flex',
//                 justifyContent: isNonMobileScreens ? 'flex-start' : 'center',
//               }}
//             >

//               <TextField
//                 type="text"
//                 placeholder="Buscar número"
//                 value={searchTerm}
//                 onChange={e => setSearchTerm(e.target.value)}
//               />
//             </Box>


//             <Box

//               sx={{
//                 borderRadius: '0.5rem',
//                 padding: '2em',
//                 bgcolor: '#D9D9D9', overflowY: 'scroll',  // Habilitar el scroll vertical
//                 height: '30rem',
//                 overflowX: 'hidden',
//               }}>
//               <Grid
//                 container
//                 justifyContent='center'

//                 spacing={0}>
//                 {filteredNumeros.map((element) => (
//                   <Grid item key={element.number}>
//                     {/* Botón para mostrar el número */}
//                     <Box
//                       display="flex"
//                       justifyContent="center"
//                       alignItems="center"
//                       width="46px
//             "
//                       height="46px
//             "
//                       fontFamily="Work Sans, sans-serif"
//                       fontWeight="700"
//                       fontSize="20px"
//                       color={
//                         selectedNumbers.includes(element)
//                           ? '#070707                '
//                           : element.available
//                             ? '#D9D9D9'
//                             : '#070707'
//                       }
//                       borderRadius="50%"
//                       backgroundColor={
//                         selectedNumbers.includes(element)
//                           ? '#004F81                '
//                           : element.available
//                             ? '#423E3F'
//                             : '#3336'
//                       }
//                       margin="0.25rem"
//                       opacity={!element.available ? 0.5 : 1}
//                       cursor={element.available ? 'pointer' : 'not-allowed'}
//                       onClick={() => element.available && handleNumberClick(element)}>
//                       {element.number}
//                     </Box>
                     
//                   </Grid>
//                 ))}
 
//               </Grid>


//               {/* <Stack spacing={2}> */}
//   {/* <Pagination   page={page}  onChange={(event, value) => setPage(value)} />   */}
// {/* </Stack>  */}

//             </Box>
//             <Box
//               width='100%'
//               sx={{
//                 display: 'flex',
//                 justifyContent: 'flex-end',
//               }}>
//               <Button
//                 variant='contained'
//                 sx={{
//                   width: '186px',
//                   height: '44px',
//                   fontWeight: '700',
//                   margin: '2em',
//                   fontSize: "14px",
//                   color: "#423E3F",
//                   borderRadius: '20px',
//                   backgroundColor: '#D68E30',
//                   '&:hover': {
//                     backgroundColor: '#630014',
//                   },
//                 }}
//                 onClick={() => {
//                   // Realizar acción con los números seleccionados
//                   addToCart(selectedNumbers);
//                   navigate('/cart');
//                 }}>Agregar al Carrito

//               </Button>
//             </Box>
           
//           </Box>
//         </Box>
//       ) : (
//         <Typography>Rifa no encontrada</Typography>
//       )}
//     </>
//   );
// };

// //////////////////////////////

// export default RifaDetailCard;
