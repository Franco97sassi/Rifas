const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
 const Numero = sequelize.define(
  'numero',
  {
   id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
   },
   number: {
    type: DataTypes.INTEGER,
    allowNull: false,
   },
   available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
   },
   userId: {
    type: DataTypes.UUID,
    allowNull: true,
   },
  },
  {
   timestamps: false,
  },
 );

 return Numero;
};
