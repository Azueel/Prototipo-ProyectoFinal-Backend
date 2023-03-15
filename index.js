const express = require('express');
const { dbConnetion } = require('./database/config');
const app = express();
require('dotenv').config();
const cors = require('cors');

//lecutra y parseo del body
app.use(express.json());

//iniciar DB
dbConnetion();

//cors
app.use(cors());

//directorio publico
app.use(express.static('public'));

app.use('/auth', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));
app.use('/shop', require('./routes/shop'));

//llamar a mi servidor
app.listen(process.env.PORT, () => {
	console.log(`servidor corriendo en el puerto ${process.env.PORT}`);
});
