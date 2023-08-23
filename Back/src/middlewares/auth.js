const jwt = require('jsonwebtoken');
const authConfig = require('./config/authConfig');
require('dotenv').config();
const { AUTH_SECRET, AUTH_EXPIRES, AUTH_ROUNDS } = process.env;

const { User } = require('../db');

/////////////////////////////////////////////////

const isUserLoggedIn = (req, res, next) => {
 //  console.log('tokeeen', req.headers);
 if (!req.headers.authorization) {
  return res.json({ msg: 'No authorization' });
 } else {
  let token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, AUTH_SECRET, async (err, decoded) => {
   if (err) {
    console.log(err.message);
    return res.json({ msg: 'No authorization 2' });
   } else {
    try {
     const userId = decoded.user; // Suponiendo que el ID del usuario está presente en el token
     //const user = await User.findById(userId); // Obtener los datos del usuario desde la base de datos

     req.user = userId; // Agregar los datos del usuario al objeto req para que estén disponibles en las rutas posteriores
     //  console.log('useeeer', req.user);
     next();
    } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
    }
   }
  });
 }
};

const isUserLoggedInAdmin = async (req, res, next) => {
 //  console.log(req.headers.authorization);
 if (!req.headers.authorization) {
  return res.json({ msg: 'No authorization' });
 } else {
  let token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, authConfig.secret, async (err, decoded) => {
   if (err) {
    return res.json({ msg: 'No authorization' });
   } else {
    try {
     const userId = decoded.user;
     //  console.log(userId);
     const user = await User.findByPk(userId.id);
     if (!user) {
      return res.json({ msg: 'User not found' });
     }
     if (user.admin) {
      // Verificar si el usuario es administrador
      req.user = user;
      next();
     } else {
      return res.json({ msg: 'Unauthorized' });
     }
    } catch (error) {
     console.log(error);
     return res.status(500).json({ error: 'Internal Server Error' });
    }
   }
  });
 }
};

module.exports = { isUserLoggedIn, isUserLoggedInAdmin };

// const jwt = require("jsonwebtoken");
// const authConfig = require("../controllers/config/auth");

// module.exports = (req, res, next) => {
//   if (!req.headers.authorization) {
//     res.json({ msg: "No authorization" });
//   } else {
//     let token = req.headers.authorization.split(" ")[1];
//     jwt.verify(token, authConfig.secret, (err, decoded) =>{
//         if(err){
//             res.json({msg: "No authorization"})
//         }else{
//           //console.log('decoded',decoded)

//             next();
//         }
//     });
//     }};
