const { Schema, model } = require('mongoose');

const PedidoSchema = Schema({
	producto: {
		type: Array,
	},

	fecha: {
		type: String,
		required: true,
		default: new Date().toLocaleString(),
	},

	estado: {
		type: String,
		default: 'pendiente',
	},

	user: {
		type: Schema.Types.ObjectId,
		ref: 'Usuario',
		required: true,
	},
});

module.exports = model('Pedido', PedidoSchema);
