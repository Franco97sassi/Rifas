import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

//-------------------- Actions --------------------------
import { getRifaDetail } from '../../store/state/actions/rifas';

//-------------------- Components --------------------------
import Footer from '../../components/footer/footer';
 import RifaDetailCard from '../../components/rifaDetailCard/RifaDetailCard';
 import NavBar from '../../components/navbar/NavBar.jsx';

const RifaDetail = () => {
 const { id } = useParams();
 const dispatch = useDispatch();
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  dispatch(getRifaDetail(id))
   .then(() => {
    setTimeout(() => {
     setLoading(false);
    }, 500); // Espera 500ms antes de establecer "loading" como falso
   })
   .catch((error) => {
    console.log('Error fetching rifa detail:', error);
    setLoading(false);
   });
 }, [dispatch, id]);

 const { rifaDetail } = useSelector((state) => state.rifas);

 return (
  <Box
   sx={{
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    bgcolor: '#F5F5F5',
   }}>
   <NavBar />
   <Box
    sx={{
     flex: '1 1 auto',
     display: 'flex',
     justifyContent: 'center',
     alignItems: 'center',
    }}>
    {loading ? (
     <CircularProgress /> // Muestra el spinner animado mientras se obtienen los datos
    ) : (
     <RifaDetailCard rifaDetail={rifaDetail} />
    )}
   </Box>
   <Footer />
  </Box>
 );
};

export default RifaDetail;
