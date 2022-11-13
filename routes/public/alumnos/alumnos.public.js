const router = require('express').Router();
const bcrypt = require('bcrypt');
const { checkSchema } = require('express-validator');

const { getAlumnoValidationSchema } = require('../../../helpers/validators/alumnos.validator');
const { loginValidationSchema } = require('../../../helpers/validators/login.validator');
const { checkValidationsResult } = require('../../../helpers/validator_utils');
const { create, getById, getByEmailWithPassword } = require('../../../models/alumnos.model');
const { manageRouterError } = require('../../../helpers/router_utils');
const { commonLogin } = require('../login_utils');

// Creación de un nuevo alumno.
router.post(
    '/register', 
    checkSchema(getAlumnoValidationSchema(true)),
    checkValidationsResult,
    async (req, res) => {
        try {
            req.body.password = bcrypt.hashSync(req.body.password, 8);

            const result = await create(req.body);
            const alumno = await getById(result.insertId);
            res.json(alumno);
        } catch (error) {
            manageRouterError(res, error);
        }
    }
);

// Login de un alumno.
router.post(
    '/login', 
    checkSchema(loginValidationSchema),
    checkValidationsResult,
    async (req, res) => {
        commonLogin(req, res, getByEmailWithPassword, 'alumno');
    }
);

module.exports = router;