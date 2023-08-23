const nodemailer = require('nodemailer');
const {
 HOST_EMAIL,
 PORT_EMAIL,
 EMAIL,
 EMAIL_PASS,

 REACT_APP_HOST,
} = process.env;

async function bannedUserNotification(email, banned) {
 let transporter = nodemailer.createTransport({
  host: `${HOST_EMAIL}`,
  port: `${PORT_EMAIL}`,
  secure: false,
  auth: {
   user: `${EMAIL}`,
   pass: `${EMAIL_PASS}`,
  },
 });

 if (banned.toString() == 'false') {
  return transporter.sendMail({
   from: `${EMAIL}`,
   to: email,
   subject: 'Tu cuenta de RifasMX fue desbaneada',
   html: `<p>Tu cuenta a RifasMX ha sido desbaneada exitosamente por un administrador</p>`,
  });
 }

 if (banned.toString() == 'true') {
  return transporter.sendMail({
   from: `${EMAIL}`,
   to: email,
   subject: 'Tu cuenta de RifasMX fue baneada',
   html: `<p>tu cuenta fue baneada por un administrador de la página, si crees que esto fue un error, ponte en contacto con este mail <a href="nutri.u.contact@gmail.com"></a></p>`,
  });
 }
}

async function changePasswordNotification(email, token) {
 let transporter = nodemailer.createTransport({
  host: `${HOST_EMAIL}`,
  port: `${PORT_EMAIL}`,
  secure: false,
  auth: {
   user: `${EMAIL}`,
   pass: `${EMAIL_PASS}`,
  },
 });

 const urlConfirm = `http://${REACT_APP_HOST}/change-password/${token}`;
 if (email && token) {
  return transporter.sendMail({
   from: `${EMAIL}`,
   to: email,
   subject: 'Change Password your Nutri-u Account',
   html: `<p>Enter the following link and reset your password<a href="${urlConfirm}"> Change Password</a></p>`,
  });
 }
}

module.exports = {
 //adminLogin,
 bannedUserNotification,
 changePasswordNotification,
};
