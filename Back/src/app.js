const express = require('express');
const server = express();

const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.routes.js');
  const mercadopago=require('mercadopago');
require('./db.js');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT,CLIENT_PORT } = process.env;
 
 
server.name = 'RIFASMX BACK';

server.use(cookieParser());
server.use(express.json());
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(morgan('dev'));
server.use((req, res, next) => {
 res.header('Access-Control-Allow-Origin', `*`); // update to match the domain you will make the request from (FRONT)
 res.header('Access-Control-Allow-Credentials', 'true');
 res.header(
  'Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept',
 );
 res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
 next();
});

// Index de las Rutas
server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => {
 // eslint-disable-line no-unused-vars
 const status = err.status || 500;
 const message = err.message || err;
 console.error(err);
 res.status(status).send(message);
});

//mercado pago
// mercadopago.configure({
//     access_token:"TEST-2046136018984093-080112-a931cacc09a8158c6648a9973b5ab5f0-190722808"
// });
server.post("/create_preference", (req, res) => {
    let preference = {
        items: [
            {
                title: req.body.description,
                unit_price: Number(req.body.price),
                quantity: Number(req.body.quantity),
            },
        ],
        back_urls: {
            success: `${CLIENT_PORT}`,
            failure:  `${CLIENT_PORT}`,
            pending: "",
        },
        auto_return: "approved",
    };
    mercadopago.preferences
        .create(preference)
        .then(function (response) {
            res.json({ id: response.body.id }); 
        })
        .catch(function (error) {
            console.log(error);
        });
}); 



//fin mercado pago

module.exports = server;
