const mercadopago = require('mercadopago');
require('dontenv').config();

mercadopago.configure({
 access_token: procces.env.ACCESS_TOKEN_MP,
});

module.exports = { mercadopago };
