const Usuario = require('../model/usuario-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const crearUsuario = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		let usuario = await Usuario.findOne({ email });

		if (usuario) {
			return res.status(400).json({
				ok: false,
				msg: 'Un usuario ya existe con este correo',
			});
		}

		usuario = new Usuario(req.body);
		console.log(usuario);

		//encriptar contraseña
		const salt = bcrypt.genSaltSync();
		usuario.password = bcrypt.hashSync(password, salt);

		//guardar usuario en DB
		await usuario.save();

		//generar jwt
		const payload = {
			id: usuario._id,
			name: usuario.name,
			rol: usuario.rol,
		};

		const token = jwt.sign(payload, process.env.SECRET_JWT, {
			expiresIn: '2h',
		});

		res.status(201).json({
			ok: true,
			uid: usuario.id,
			name: usuario.name,
			rol: usuario.rol,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'por favor contactate con el administrador',
		});
	}
};

const loginUsuario = async (req, res) => {
	const { email, password } = req.body;

	try {
		//validando si existe el usuario
		const usuario = await Usuario.findOne({ email });

		//si el usuario no existe...
		if (!usuario) {
			return res.status(400).json({
				ok: false,
				msg: 'El Email o la contraseña es incorrecta',
			});
		}

		//confirmar contraseñas
		const validarContraseña = bcrypt.compareSync(password, usuario.password);

		if (!validarContraseña) {
			return res.status(400).json({
				ok: false,
				msg: 'el email o la contraseña es incorrecta',
			});
		}

		//generar jwt
		const payload = {
			id: usuario._id,
			name: usuario.name,
			usuario: usuario.rol,
		};

		const token = jwt.sign(payload, process.env.SECRET_JWT, {
			expiresIn: '2h',
		});

		res.status(200).json({
			ok: true,
			uid: usuario.id,
			name: usuario.name,
			rol: usuario.rol,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'por favor contactate con el administrador',
		});
	}
};

module.exports = {
	crearUsuario,
	loginUsuario,
};
