const router = require('express').Router();
const bcrypt = require('bcrypt');
const { checkSchema } = require('express-validator');
const { create, getById } = require('../../../models/profesores.model');
const { getById: getUsuarioById } = require('../../../models/usuarios.model');
const { checkValidationsResult } = require('../../../helpers/validator_utils');
const { manageRouterError } = require('../../../helpers/router_utils');
const { getProfesorValidationSchema } = require('../../../helpers/validators/profesores.validator');

// Creación de un nuevo profesor.
router.post(
    '/register', 
    checkSchema(getProfesorValidationSchema(true)),
    checkValidationsResult,
    async (req, res) => {
        try {
            req.body.password = bcrypt.hashSync(req.body.password, 8);

            const profesorId = await create(req.body);
            profesor = await getById(profesorId);
            usuario  = await getUsuarioById(profesor.usuarioId);
            delete usuario.id;
            res.json({...usuario, ...profesor});
        } catch (error) {
            manageRouterError(res, error);
        }
    }
);

module.exports = router;