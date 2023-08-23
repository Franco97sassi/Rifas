const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
 sequelize.define(
  'user',
  {
   id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
   },
   username: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
   },
   email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
     isEmail: true,
    },
   },
   password: {
    allowNull: false,
    type: DataTypes.STRING,
   },
   banned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
   },
   admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
   },
   emailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
   },
  },
  {
   timestamps: false,
  },
 );
};
