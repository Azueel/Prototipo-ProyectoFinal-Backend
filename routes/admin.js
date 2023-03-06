const express = require('express');
const { check } = require('express-validator');
const {
	crearProducto,
	cargarProductos,
	cargarUsuarios,
} = require('../controllers/admin');
const { validarCampos } = require('../middlewares/validarCampos');
const routerAdmin = express.Router();

routerAdmin.post(
	'/new',
	[
		check('name', 'el nombre es obligatorio').not().isEmpty(),
		check('precio', 'el precio es obligatorio').not().isEmpty(),
		check('cantidad', 'la cantidad es obligatorio').not().isEmpty(),
		check('descripcion', 'la descripcion es obligatoria').not().isEmpty(),

		validarCampos,
	],
	crearProducto
);

routerAdmin.get('/productos', cargarProductos);

routerAdmin.get('/usuarios', cargarUsuarios);

module.exports = routerAdmin;
