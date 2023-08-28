const mercadopago = require('mercadopago');
const axios = require("axios")
 const { Orden, User } = require('../db')
const { v4: uuidv4 } = require('uuid');

const {
  NOTIFICATION_MERCADOPAGO_FRONT,
  NOTIFICATION_MERCADOPAGO_BACK,ACCESS_TOKEN_MP,CLIENT_PORT,SERVER_PORT
} = process.env;


  const postPagar = async (req, res) => {
    
    mercadopago.configure({
    access_token: "TEST-8021216670138113-070920-8fec9d16d8b40375f92b98e1eb06b24d-235741436"
});

    const preferenceId = uuidv4();

    try {
      const { cart } = req.body;
      
      
      if (!cart || !Array.isArray(cart) || cart.length === 0) {
        return res.status(400).send({ msg: 'No se proporcionaron productos válidos' });
      }

      
      const items = cart.map((producto) => ({
        title: `${producto.productName} - ${producto.number}`,
        quantity: 1,
        currency_id: 'ARS',
        unit_price: producto.numbersPrice
        ,
      }));
      
      const preference = {
        items: items,

        back_urls: {
          success: `${CLIENT_PORT}/ordenes`,
          pending: `${NOTIFICATION_MERCADOPAGO_FRONT}/success?preferenceId=${preferenceId}`,
          failure: `${NOTIFICATION_MERCADOPAGO_FRONT}/success?preferenceId=${preferenceId}`,
        },
        notification_url: `https://7882-186-136-152-49.ngrok-free.app/rifas/webhook?preferenceId=${preferenceId}`,
      };


  
      // Crear la preferencia en MercadoPago
      const response = await mercadopago.preferences.create(preference);
      console.log(response, "soy response")
  
      
      
  
      // Guardar la orden en la base de datos
      const orden = await Orden.create({
        preferenceId,
        cart,
        userId:cart[0].userId,
      });
  
      // Redirigir al usuario al checkout de MercadoPago
      res.send({ response });
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      res.status(500).send('Error al procesar el pago');
    }
  };




  const getMercado = async (req, res) => {
    try {
      const payment = req.query;
  
      console.log(req.query);
      if (payment.type === "payment") {
        const data = await mercadopago.payment.findById(payment['data.id']);
        const preferenceId = payment.preferenceId;
  
        const orden = await Orden.findOne({ where: { preferenceId: preferenceId } });
        if (orden && data.body.status === 'approved') {
          orden.estado = 'PAGADO CON EXITO';
          orden.idCompra = payment['data.id']; // numero de id compra q nos da mercadopago
  
          await orden.save();
  
          const user = await User.findOne({ where: { id: orden.userId } });
  
          // Iterar sobre el array orden.cart y hacer una solicitud PUT por cada elemento
          for (const item of orden.cart) {
            const { rifaId, number, userId } = item;
  
            // Llamar a la ruta PUT buyRifa con los datos necesarios
            try {
              const response = await axios.put(`${SERVER_PORT}/rifas/buyRifa`, {
                rifaId,
                number,
                userId,
              });
              const buyRifaResult = response.data;
              // Procesar buyRifaResult si es necesario
            } catch (error) {
              console.log('Error en la solicitud PUT a buyRifa:', error.message);
            }
          }
        }
      }
  
      res.send("webhook");
  
    } catch (error) {
      console.log(error);
    }
  };







  const Ordenes = async (req, res) => {
    try {
      const { userId } = req.params; // Obtener el ID de usuario desde los parámetros de URL
      
      const ordenes = await Orden.findAll({ where: { userId: userId } });
  
      if (!ordenes || ordenes.length === 0) {
        return res.status(404).json({ message: 'No se encontraron órdenes para el usuario proporcionado.' });
      }
  
      res.json(ordenes);
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor.', error: error.message });
    }
  };

  const allOrdenes = async (req, res) => {
    try {
        
      const ordenes = await Orden.findAll();
   
      res.json(ordenes);
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor.', error: error.message });
    }
  };
  
  const pagination = async (req, res) => {
    try {
      const page = parseInt(req.query.page) ||1; // Página actual
      const perPage = parseInt(req.query.perPage)  ||10  // Cantidad de posts por página
      const searchQuery = req.query.search || ''; // Consulta de búsqueda por título o tag
  
      const offset = (page - 1) * perPage;
  
      const whereClause = {
        [Op.or]: [
          { titulo: { [Op.iLike]: `%${searchQuery}%` } },
          { tags: { [Op.contains] : [searchQuery] } }
        ]
      };
  
      const { count, rows: posts } = await PostBlog.findAndCountAll({
        where: whereClause,
        offset,
        limit: perPage,
        include: [
          {
              model: User,
              as: 'user',
              attributes: ['imgPerfil', 'username', 'email'],
          },
      ],
      },);
  
      if (count === 0) {
        return res.status(404).json({ message: 'No se encontraron posts.' });
      }
  
      const totalPages = Math.ceil(count / perPage);
  
      return res.status(200).json({
        totalPages,
        currentPage: page,
        perPage,
        posts,
      });
    } catch (error) {
      console.error('Error al obtener blogs:', error);
      return res.status(500).json({ error: 'Hubo un error al obtener los blogs.' });
    }
  
        
       
 
  };
  const ordenesId = async (req, res) => {

    try {
      const preferenceId = req.params.preferenceId; 
      const orden = await Orden.findOne({ where: { preferenceId: preferenceId } });

      if (!orden) {
        return res.status(404).json({ error: 'Orden no encontrada' });
      }

      return res.json(orden);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  };


  module.exports = {
     postPagar , getMercado, Ordenes,allOrdenes,ordenesId}; 