const Pedido = require('../model/pedido-model');
const ProductoSeleccionado = require('../model/productoSeleccionado-model');

const pedidoProducto = async (req, res) => {
	const productoSeleccionado = new ProductoSeleccionado(req.body);

	try {
		productoSeleccionado.user = req.id;
		await productoSeleccionado.save();
		res.status(200).json({
			ok: true,
			msg: 'Producto Agregado',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'por favor contactate con el administrador',
		});
	}
};

const cargarProductoSelecionados = async (req, res) => {
	const id = req.id;
	try {
		const cargarProducto = await ProductoSeleccionado.find({ user: id });

		res.json({
			ok: true,
			cargarProducto,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'por favor contactate con el administrador',
		});
	}
};

const sacarPedido = async (req, res) => {
	console.log(req.params.id);
	try {
		const pedidoEliminar = await ProductoSeleccionado.findById(req.params.id);

		if (!pedidoEliminar) {
			return res.status(404).json({
				ok: false,
				msg: 'No existe un producto con este ID',
			});
		}

		await ProductoSeleccionado.findByIdAndDelete(req.params.id);

		res.status(200).json({
			ok: true,
			msg: 'Producto Eliminado',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'hable con el administrador',
		});
	}
};

const guardarPedido = async (req, res) => {
	try {
		const pedido = new Pedido(req.body);
		pedido.user = req.id;
		pedido.producto = req.body.menu;

		await pedido.save();

		res.status(200).json({
			ok: true,
			msg: 'Producto Agregado',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'hable con el administrador',
		});
	}
};

module.exports = {
	pedidoProducto,
	cargarProductoSelecionados,
	sacarPedido,
	guardarPedido,
};
