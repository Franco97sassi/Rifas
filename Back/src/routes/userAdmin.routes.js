const { Router } = require('express');

//-------------------- Controllers & Middlewares --------------------------
const { isUserLoggedInAdmin } = require('../middlewares/auth');
const {
 allUsers,
 notification,
 banUser,
} = require('../controllers/userAdmin.controller');

const router = Router();

//-------------------- User Routes --------------------------

router.get('/users', isUserLoggedInAdmin, allUsers);

router.get('/notification', isUserLoggedInAdmin, notification);

router.post('/ban', isUserLoggedInAdmin, banUser);

///////////////////////////////////////////////

module.exports = router;
