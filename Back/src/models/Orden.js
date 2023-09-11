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
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW, // Se establece la fecha y hora actual al crear una orden
          },

      });
};
// const { DataTypes } = require('sequelize');
// const { Op } = require('sequelize');

// module.exports = (sequelize) => {
//   const Orden = sequelize.define('Orden', {
//     cart: {
//       type: DataTypes.ARRAY(DataTypes.JSONB),
//       allowNull: false
//     },
//     preferenceId: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     estado: {
//       type: DataTypes.STRING,
//       defaultValue: "NO PAGADO"
//     },
//     idCompra: {
//       type: DataTypes.STRING,
//       defaultValue: ""
//     },
//     userId: {
//       type: DataTypes.STRING,
//     },
//   });

//   // Función para eliminar órdenes no pagadas después de 12 horas
//   const deleteUnpaidOrders = async () => {
//     const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000); // 12 horas en milisegundos
//     await Orden.destroy({
//       where: {
//         estado: "NO PAGADO",
//         createdAt: {
//           [Op.lt]: twelveHoursAgo
//         }
//       }
//     });
//   };

//   // Ejecutar la función cada cierto tiempo (por ejemplo, cada hora)
//   setInterval(deleteUnpaidOrders, 60 * 60 * 1000); // Ejecutar cada hora

//   return Orden;

//  };
