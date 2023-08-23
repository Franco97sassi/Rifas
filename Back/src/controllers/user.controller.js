require('dotenv').config();
const { User } = require('../db');
const { spawn } = require('child_process');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const {
 HOST_EMAIL,
 PORT_EMAIL,
 EMAIL,
 EMAIL_PASS,
 DB_HOST,
 DB_PORT,
 CLIENT_PORT,
 REACT_APP_HOST,
 AUTH_SECRET,
 AUTH_EXPIRES,
 AUTH_ROUNDS,
} = process.env;

//-------------------- Middlewares & Services --------------------------

const { changePasswordNotification } = require('../utils/notifications');

//-------------------- User Controllers --------------------------

const userSignIn = async (req, res) => {
 // Verificar si req.body es null o undefined
 if (req.body === null || req.body === undefined) {
  res.status(400).send({ message: 'Invalid request body' });
  return;
 }

 // Obtener los datos del cuerpo de la solicitud
 const { username, email, password } = req.body;

 // Verificar si los campos requeridos están presentes
 if (!username || !email || !password) {
  res.status(400).send({ message: 'Missing required fields' });
  return;
 }

 let passwordCryp = bcrypt.hashSync(password, Number.parseInt(AUTH_ROUNDS));

 try {
  const usernameCreate = await User.findOne({
   where: { username: username },
  });
  const emailCreate = await User.findOne({ where: { email: email } });

  if (usernameCreate) {
   res.status(400).send({ message: 'El nombre de usuario ya esta en uso' });
  } else if (emailCreate) {
   res.status(400).send({ message: 'Email en uso, por favor elige otro' });
  } else if (!usernameCreate && !emailCreate) {
   User.create({
    username: username,
    email: email,
    password: passwordCryp,
   }).then((user) => sendConfirmationEmail(user));
   res.send({
    message:
     'Usuario creado correctamente, verifica tu mail para poder acceder correctamente',
   });
  }
 } catch (err) {
  console.log(err.message);
  res.status(400).send(err);
  console.log('Password:', password);
  console.log('Rounds:', AUTH_ROUNDS);
 }
};

const userLogIn = async (req, res) => {
 try {
  let { email, password } = req.body;
  let user = await User.findOne({
   where: {
    email: email,
   },
  });
  // console.log(user)
  if (!user) {
   throw new Error('Email incorrecto');
  } else {
   if (user.banned) {
    throw new Error(
     'No estas autorizado para acceder al sitio web, deberas esperar a que un administrador habilite tu cuenta.',
    );
   } else if (!user.emailVerified) {
    throw new Error(
     'Todavia no has confirmado tu cuenta, chequea tu casilla de email y sigue los pasos para activarla.',
    );
   } else if (bcrypt.compareSync(password, user.password)) {
    let token = jwt.sign({ user: user }, AUTH_SECRET, {
     expiresIn: AUTH_EXPIRES,
    });

    const { password, ...userWithoutPassword } = user.dataValues;

    // console.log(token);
    res.status(200).json({
     user: userWithoutPassword,
     token: token,
    });
   } else {
    throw new Error('Contraseña incorrecta.');
   }
  }
 } catch (error) {
  console.log(error.message);
  res.status(400).json({
   error: error.message,
  });
 }
};

const protected = async (req, res) => {
 try {
  const user = req.user;
  // Eliminar la propiedad "password" del objeto "user"
  const { password, ...userWithoutPassword } = user;
  // Realizar acciones con los datos del usuario aquí
  res.status(200).json({ user: userWithoutPassword, msg: 'Acceso autorizado' });
 } catch (error) {
  res.status(500).json({ error: 'Error en el servidor' });
 }
};

const sendConfirmationEmail = (user) => {
 const token = jwt.sign({ userId: user.id }, AUTH_SECRET);

 const activationLink = `${CLIENT_PORT}/confirm?token=${token}`;

 const mailOptions = {
  from: `${EMAIL}`,
  to: user.email,
  subject: '¡Su cuenta en RifasMX fué creada con éxito!',
  html: `
      <h1>Bienvenido a RifasMX.</h1>
      <p>Gracias por registrarte. Para activar tu cuenta y comenzar a comprar rifas, haz clic en el siguiente enlace:</p>
      <a href="${activationLink}">Activa tu cuenta presionando aquí</a>
    `,
 };

 let transporter = nodemailer.createTransport({
  host: `${HOST_EMAIL}`,
  port: `${PORT_EMAIL}`,
  secure: false,
  auth: {
   user: `${EMAIL}`,
   pass: `${EMAIL_PASS}`,
  },
 });

 transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
   console.log('Error al enviar el correo electrónico:', error.message);
  } else {
   console.log('Correo electrónico enviado:', info.response);
  }
 });
};

async function confirmToken(token) {
 try {
  const payload = jwt.verify(token, AUTH_SECRET);
  User.update(
   { emailVerified: true },
   {
    where: {
     id: payload.userId,
    },
   },
  );
 } catch (err) {
  console.log(err.message);
  throw new Error('Ups!, token is invalid');
 }
}

const confirmAccount = async (req, res) => {
 // confirmar cuenta controller
 let { token } = req.params;
 //  console.log(token);
 try {
  confirmToken(token)
   .then(() => {
    res
     .status(200)
     .send({ succes: true, message: 'user confirmed succesfully' });
   })
   .catch((err) =>
    res.status(400).send({ succes: false, message: err.message }),
   );
 } catch (err) {
  console.log(err);
 }
};

const forgotPassword = async (req, res) => {
 const { email } = req.body;
 try {
  if (!email) {
   res.send({ message: 'Insert email' });
  } else if (email) {
   const oldUser = await User.findOne({ where: { email: email } });

   if (!oldUser) {
    res.status(400).send({ message: 'Email no exist' });
   } else if (oldUser) {
    var token = jwt.sign({ email: oldUser.email }, AUTH_SECRET, {
     expiresIn: '5m',
    });
    changePasswordNotification(email, token);
    res.send({
     message:
      'Se envió correctamente un mail para reestablecer tu contraseña, por favor chequea tu casilla de correo electronico y sigue las instrucciones',
    });
   }
  }
 } catch (error) {
  console.log(error);
 }
};

const newPassword = async (req, res) => {
 let { token } = req.params;
 let { password } = req.body;

 let passwordCryp = bcrypt.hashSync(password, Number.parseInt(AUTH_ROUNDS));

 try {
  const payload = jwt.verify(token, AUTH_SECRET);
  let email = payload.email;
  User.update(
   { password: passwordCryp },
   {
    where: {
     email: email,
    },
   },
  );

  res.send({ message: 'Tu contraseña fue actualizada correctamente' });
 } catch (error) {
  res.status(400).send({
   message:
    'Tu sesión expiró, o el token es invalido, por favor intentalo mas tarde',
  });
 }
};

/////////////////////////////////////////////////////////////

module.exports = {
 userSignIn,
 userLogIn,
 confirmAccount,
 forgotPassword,
 newPassword,
 protected,
};
