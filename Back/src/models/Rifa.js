const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
 sequelize.define(
  'rifa',
  {
   id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
   },
   product: {
    allowNull: false,
    type: DataTypes.STRING,
   },
   imgProduct: {
    type: DataTypes.TEXT,
    allowNull: true,
   },
   description: {
    type: DataTypes.TEXT,
    allowNull: false,
   },
   numbersPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
   },
  },
  {
   timestamps: false,
  },
 );
};
