const { Router } = require('express');

//-------------------- Controllers & Middlewares --------------------------
const { isUserLoggedIn, isUserLoggedInAdmin } = require('../middlewares/auth');
const {
 checkRifas,
 createRifa,
 rifaDetail,
 updateRifa,
 buyRifa,
 deleteRifa,
  

} = require('../controllers/rifas.controller');

const{postPagar,getMercado, Ordenes,allOrdenes,ordenesId}=require("../controllers/mercadoControllers")
const router = Router();

//-------------------- Rifas Routes --------------------------

router.get('/checkRifas', checkRifas);

router.get('/detail/:id', rifaDetail);

router.post('/createRifa', createRifa);
router.delete('/deleteRifa/:id',deleteRifa);


// router.post('/updateRifa', isUserLoggedInAdmin, updateRifa);

// router.post('/deleteRifa', isUserLoggedInAdmin, deleteRifa);

router.put('/buyRifa', buyRifa);

///////////////////////////////////////////////
router.post("/mercadoPago",postPagar)
router.post("/webhook",getMercado)

router.get("/ordenes/:userId", Ordenes)
router.get("/allordenes", allOrdenes)
router.get("/ordenesAgregadas/:preferenceId", ordenesId)
 

module.exports = router;
