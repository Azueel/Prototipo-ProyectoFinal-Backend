const express = require('express');
const { check } = require('express-validator');
const {
	crearProducto,
	cargarProductos,
	cargarUsuarios,
	eliminarProducto,
	editarProducto,
} = require('../controllers/admin');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validarCampos');
const routerAdmin = express.Router();

routerAdmin.post(
	'/new',

	[
		validarJWT,
		check('name', 'el nombre es obligatorio').not().isEmpty(),
		check('precio', 'el precio es obligatorio').not().isEmpty(),
		check('cantidad', 'la cantidad es obligatorio').not().isEmpty(),
		check('descripcion', 'la descripcion es obligatoria').not().isEmpty(),

		validarCampos,
	],
	crearProducto
);

routerAdmin.get('/productos', validarJWT, cargarProductos);

routerAdmin.get('/usuarios', validarJWT, cargarUsuarios);

routerAdmin.delete('/eliminar/:id', validarJWT, eliminarProducto);

routerAdmin.put('/editar', validarJWT, editarProducto);

module.exports = routerAdmin;
