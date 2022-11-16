const router = require('express').Router();
const bcrypt = require('bcrypt');
const { checkSchema } = require('express-validator');

const { getAlumnoValidationSchema } = require('../../../helpers/validators/alumnos.validator');
const { checkValidationsResult } = require('../../../helpers/validator_utils');
const { create } = require('../../../models/inscripciones.model');
const { manageRouterError } = require('../../../helpers/router_utils');
const { success } = require('../../../helpers/success_utils');

// Creación de un nuevo alumno.
router.post(
    '/register', 
    checkSchema(getAlumnoValidationSchema(true)),
    checkValidationsResult,
    async (req, res) => {
        try {
            req.body.password = bcrypt.hashSync(req.body.password, 8);

            await create(req.body);
            res.json(success);
        } catch (error) {
            manageRouterError(res, error);
        }
    }
);

module.exports = router;