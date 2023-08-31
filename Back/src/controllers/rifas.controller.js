require('dotenv').config();
const { Rifa, Numero, User } = require('../db');
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

//-------------------- Rifas Controllers --------------------------

const createRifa = async (req, res) => {
  console.log(req.body)

 const { product, imgProduct, description, numbersPrice, totalNumbers } =
  req.body;
 
 try {
  const rifa = await Rifa.create(
   {
    product,
    imgProduct,
    description,
    numbersPrice,
    numeros: [], // Incluir un array vacío para la relación 'numeros'
   },
   {
    include: 'numeros', // Incluir la relación 'numeros' al crear la rifa
   },
  );
   
  const numbers = [];

  for (let i = 1; i <= totalNumbers; i++) {
    numbers.push({
     number: i,
     available: true,
     RifaId: rifa.id,
    });
   }
  await Numero.bulkCreate(numbers);

  // res.json(rifa);
  // res.status(200).json({ status: "success", msg: "El producto se creo exitosamente" });
  res.status(200).json({ status: "success", msg: "El producto se creó exitosamente", rifa });

 } catch (err) {
  console.log(err.message);
 }
};

const checkRifas = async (req, res) => {
 try {
  const rifas = await Rifa.findAll({ include: 'numeros' });
  res.json(rifas);
 } catch (error) {
  res.status(500).json({ 'Error en el servidor: ': error.message });
 }
};

const buyRifa = async (req, res) => {
 try {
  const { rifaId, number, userId } = req.body;
  const rifa = await Rifa.findByPk(rifaId, {
   include: { model: Numero, as: 'numeros', include: User },
  });

  const selectedNumber = rifa.numeros.find((n) => n.number === number);

  if (selectedNumber && selectedNumber.available) {
   selectedNumber.available = false;
   selectedNumber.userId = userId;

   try {
    await selectedNumber.save(); // Guardar los cambios en la instancia de Número
   } catch (err) {
    console.log(err.message);
   }

   // Asociar el número comprado con el usuario correspondiente
   const user = await User.findByPk(userId);
   await selectedNumber.setUser(user);

   res.send({ rifa, userId }); // El número se compró exitosamente
  } else {
   res
    .status(409)
    .send(`El número ${number} de la rifa ${rifa.product} ya está comprado`); // El número ya está comprado o no existe
  }
 } catch (err) {
  res.status(500).json({ 'Error en el servidor: ': err.message });
 }
};

// const rifaDetail = async (req, res) => {
//  let { id } = req.params;
//  try {
//   const rifa = await Rifa.findByPk(id, { include: 'numeros' });
//   console.log();
//   res.status(200).json(rifa);
//  } catch (error) {
//   res.status(500).json({ 'Error en el servidor: ': error.message });
//  }
// };
 
const NUMBERS_PER_PAGE = 1000; // Número de números por página en los detalles de la rifa

const rifaDetail = async (req, res) => {
 try {
  const { id } = req.params;
  const page = req.query.page ? parseInt(req.query.page) : 1; // Parsea el número de página
  const offset = (page - 1) * NUMBERS_PER_PAGE;
  const numeroToSearch = parseInt(req.query.numero) || ''; // Parsea el número a buscar desde la query

  const whereClause = numeroToSearch ? { 'number': numeroToSearch } : {};

  const rifa = await Rifa.findByPk(id, {
    include: {
      model: Numero,
      as: 'numeros',
      where: whereClause,
      limit: NUMBERS_PER_PAGE,
      offset: offset
    }
  });

  // Obtén la cantidad total de números asociados a la rifa
  const totalNumeros = await Numero.count({ where: { RifaId: id } });

  // Calcula la cantidad total de páginas
  const totalPages = Math.ceil(totalNumeros / NUMBERS_PER_PAGE);

  // Crear el objeto de respuesta que incluye la rifa, la información de paginación y números
  const response = {
    rifa,
    pagination: {
      currentPage: page,
      totalPages,
      totalNumeros
    }
  };

  res.status(200).json(response);
 } catch (error) {
  res.status(500).json({ 'Error en el servidor: ': error.message });
 }
};

const deleteRifa = async (req, res) => {
  const { id } = req.params; // Destructuramos el id directamente del req.params

  try {
    const deletedRifa = await Rifa.destroy({
      where: { id: id }, // Utilizamos un objeto where para especificar la condición de eliminación por el id.
    });

    if (deletedRifa === 0) {
      // Si el número de filas eliminadas es 0, significa que no se encontró la Rifa con el id dado.
      return res.status(404).json({ status: "error", msg: "El producto no existe" });
    }

    res.status(200).json({ status: "success", msg: "El producto se eliminó exitosamente" });
  } catch (error) {
    console.error("Error al eliminar la Rifa:", error);
    res.status(500).json({ status: "error", msg: "Hubo un error al eliminar la Rifa" });
  }
};
     
module.exports = {
 createRifa,
 checkRifas,
 rifaDetail,
 buyRifa,
  deleteRifa,
};
