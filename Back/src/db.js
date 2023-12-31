require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

// Seteamos la Base de datos con sus configuraciones

 let sequelize =
 process.env.NODE_ENV === 'production'
  ? new Sequelize({
     database: DB_NAME,
     dialect: 'postgres',
     host: DB_HOST,
     port: DB_PORT,
     username: DB_USER,
     password: DB_PASSWORD,
     pool: {
      max: 3,
      min: 1,
      idle: 10000,
     },
     dialectOptions: {
      ssl: {
       require: true,
       // Ref.: https://github.com/brianc/node-postgres/issues/2009
       rejectUnauthorized: false,
      },
      keepAlive: true,
     },
     ssl: true,
    })
  : new Sequelize(
     `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
     { logging: false, native: false },
    );

const basename = path.basename(__filename);

const modelDefiners = [];

fs
 .readdirSync(path.join(__dirname, '/models'))
 .filter(
  (file) =>
   file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
 )
 .forEach((file) => {
  modelDefiners.push(require(path.join(__dirname, '/models', file)));
 });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
 entry[0][0].toUpperCase() + entry[0].slice(1),
 entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// Importamos los models

const { Rifa, User, Numero } = sequelize.models;

// Insertar las Relaciones (de momento no hay)

Rifa.hasMany(Numero, { foreignKey: 'RifaId', as: 'numeros' });
Numero.belongsTo(Rifa, { foreignKey: 'RifaId' });

User.hasMany(Numero, { foreignKey: 'UserId', as: 'numeros' });
Numero.belongsTo(User, { foreignKey: 'UserId' });

module.exports = {
 ...sequelize.models,
 db: sequelize,
};
