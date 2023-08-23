require('dotenv').config();
const { User } = require('../db');
const { spawn } = require('child_process');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

//-------------------- User Admin Controllers --------------------------

const allUsers = async (req, res) => {
 try {
  const users = await User.findAll({ where: { banned: false } });
  res.json({ users });
 } catch (error) {
  res.status(500).json({ error: 'Error en el servidor' });
 }
};

const banUser = async (req, res) => {
 try {
  const { id } = req.body;

  // Buscar el usuario por ID en la base de datos
  const user = await User.findOne({ where: { id } });

  if (!user) {
   return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  user.banned = true;
  user.emailVerified = true;
  await user.save();

  res.json({ message: 'Cuenta Baneada' });
 } catch (error) {
  res.status(500).json({ error: 'Error en el servidor' });
 }
};

const notification = async (req, res) => {
 try {
  const users = await User.findAll({ where: { emailVerified: false } });
  res.json({ users });
 } catch (error) {
  res.status(500).json({ error: 'Error en el servidor' });
 }
};

////////////////////////////////

module.exports = { allUsers, banUser, notification };
