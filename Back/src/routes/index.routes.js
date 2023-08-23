const { Router } = require('express');
const userRoutes = require('./user.routes');
const rifasRoutes = require('./rifas.routes');
  const adminRoutes = require('./userAdmin.routes');

const router = Router();

//--------------------  Routes --------------------------

router.use('/user', userRoutes);
router.use('/rifas', rifasRoutes);
  router.use('/admin', adminRoutes)

module.exports = router;
