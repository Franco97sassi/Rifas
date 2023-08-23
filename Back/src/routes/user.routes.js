const { Router } = require('express');

//-------------------- Controllers & Middlewares --------------------------
const { isUserLoggedIn } = require('../middlewares/auth');
const {
 userLogIn,
 userSignIn,
 forgotPassword,
 newPassword,
 protected,
 confirmAccount,
} = require('../controllers/user.controller');

const router = Router();

//-------------------- User Routes --------------------------

router.get('/confirm/:token', confirmAccount);

router.post('/signin', userSignIn);

router.post('/login', userLogIn);

router.get('/protected', isUserLoggedIn, protected);

router.post('/forgotPassword', isUserLoggedIn, forgotPassword);

router.post('/newPassword/:token', isUserLoggedIn, newPassword);

///////////////////////////////////////////////

module.exports = router;
