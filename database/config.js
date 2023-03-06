const mongoose = require('mongoose');

const dbConnetion = async () => {
	try {
		await mongoose.connect(process.env.DB_CNN);

		console.log('db conectado');
	} catch (error) {
		console.log(error);
		throw new Error('No se pudo inicializar la base de datos');
	}
};

module.exports = { dbConnetion };
