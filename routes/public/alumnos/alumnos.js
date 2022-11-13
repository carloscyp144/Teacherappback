const router = require('express').Router();
const bcrypt = require('bcrypt');
const { checkSchema } = require('express-validator');

const { alumnoValidationSchema } = require('../../../helpers/validators/alumnos.validator');
const { checkValidationsResult } = require('../../../helpers/validator_utils');
const { create, getById }        = require('../../../models/alumnos.model');
const { manageRouterError }      = require('../../../helpers/router_utils');

// Creación de un nuevo alumno.
router.post(
    '/register', 
    checkSchema(alumnoValidationSchema),
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

module.exports = router;