const Producto = require('../model/producto-model');
const Usuario = require('../model/usuario-model');

const crearProducto = async (req, res) => {
	try {
		let producto = new Producto(req.body);

		await producto.save();

		res.status(201).json({
			ok: true,
			msg: 'producto creado',
			producto,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: true,
			msg: 'Hable con el administrador',
		});
	}
};

const cargarProductos = async (req, res) => {
	try {
		const productos = await Producto.find();

		res.status(200).json({
			ok: true,
			productos,
		});
	} catch (error) {
		console.log(error);

		res.status(500).json({
			ok: false,
			msg: 'hable con el administrador',
		});
	}
};

const cargarUsuarios = async (req, res) => {
	try {
		const usuarios = await Usuario.find();

		res.status(200).json({
			ok: true,
			usuarios,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'hable con el administrador',
		});
	}
};

module.exports = { crearProducto, cargarProductos, cargarUsuarios };
