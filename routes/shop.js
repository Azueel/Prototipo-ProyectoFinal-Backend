const express = require('express');

const {
	pedidoProducto,
	cargarProductoSelecionados,
	sacarPedido,
	guardarPedido,
} = require('../controllers/shop');
const { validarJWT } = require('../middlewares/validar-jwt');

const routerShop = express.Router();

routerShop.post('/', validarJWT, pedidoProducto);

routerShop.get('/', validarJWT, cargarProductoSelecionados);

routerShop.delete('/:id', validarJWT, sacarPedido);

routerShop.post('/pedido', validarJWT, guardarPedido);

module.exports = routerShop;
