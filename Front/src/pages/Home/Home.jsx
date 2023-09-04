import { Box } from '@mui/material';

//-------------------- Components --------------------------
import Footer from '../../components/footer/footer';
import NavBar from '../../components/navbar/NavBar.jsx';
import CurrentRifas from '../../components/currentRifas/CurrentRifas';
import Carrousel from '../../components/Carrousel/Carrousel';
import '../../index.css'

////////////////////////
const Home = ({isUserAdmin}) => {
 return (
  <Box
   sx={{
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
   }}>
   
   <NavBar isUserAdmin={isUserAdmin} />
   

   <Box
    sx={{ flex: '1 1 auto' }}
    bgcolor='#FFFFFF'>
      <Carrousel/>  
    <CurrentRifas />
   </Box>
   <Footer />
  </Box>
 );
};

///////////////////////

export default Home;