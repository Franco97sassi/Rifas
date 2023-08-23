const server = require('./src/app.js');
require('dotenv').config();

const port = process.env.PORT;
const { db } = require('./src/db.js');

// Syncing all the models at once.
db.sync({ alter: true }).then(() => {
 console.log(port);
 server.listen(port, () => {
  console.log(`%s listening at ${port}`); // eslint-disable-line no-console
 });
});
