import React from "react";
import Carousel from 'react-material-ui-carousel'
import { Box, Typography, useMediaQuery } from '@mui/material';

import imagen1 from "../../assets/imagen1.png"
import imagen2 from "../../assets/imagen2.png"
import imagen3 from "../../assets/imagen3.png"
import { useTheme } from "@emotion/react";


const Carrousel = () => {
    const theme1 = useTheme();
    // const isNonMobileScreens = useMediaQuery(theme1.breakpoints.up('md')); // Cambio de 'min-width' a 'up'
    const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

    var items = [
        {
            name: "Random Name #1",
            description: "¡ Rifas todas las semanas,prueba y gana!",
            img: imagen1
        },
        {
            name: "Random Name #2",
            description: "Tus pagos están 100% protegidos",
            img: imagen2
        },
        {
            name: "Random Name #3",
            description: "¡ Rifas todas las semanas,prueba y gana!",
            img: imagen3
        },
    ]

    return (
        <div style={{ marginTop: "0px" }}>
            <Carousel indicators={false}>
                {
                    items.map((item, i) =>
                        <div key={i}>
                            <Box sx={{ display: "flex", justifyContent: "center" }} key={i} item={item}>
                                <img src={item.img} style={{ height: "100%" ,width:"100%" }}></img>
                                <Typography sx={{ position: "absolute", fontSize: "28px", fontWeight: "600", color: "white", display: "flex", alignItems: "center", marginTop: "25%" }}>
                                    {item.description}</Typography>
                            </Box></div>)
                }
            </Carousel>
        </div>
    )
}

export default Carrousel