const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('Orden', {
        
          cart: {
            type: DataTypes.ARRAY(DataTypes.JSONB),
            allowNull: false
          },
          preferenceId: {
            type: DataTypes.STRING,
            allowNull: false
          },
          estado:{
            type: DataTypes.STRING,
            defaultValue: "NO PAGADO"
          },
          idCompra:{
            type: DataTypes.STRING,
            defaultValue: ""
          },
          userId:{
            type:DataTypes.STRING,
            
          },
          

      });
};