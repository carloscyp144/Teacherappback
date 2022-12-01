const router = require('express').Router();

const { checkSchema } = require('express-validator');
const { manageRouterError } = require('../../../helpers/router_utils');
const { success } = require('../../../helpers/success_utils');
const { checkRole } = require('../../../helpers/token_utils');
const { mensajeValidationSchema } = require('../../../helpers/validators/mensaje.validator');
const { checkValidationsResult } = require('../../../helpers/validator_utils');
const { profesorRoleDescription, alumnoRoleDescription } = require('../../../models/roles.model');

// Enviar un mensaje.
// (Solo lo podrá hacer un alumno)
router.post(
    '/alumnos/send',
    checkRole(alumnoRoleDescription),
    checkSchema(mensajeValidationSchema),
    checkValidationsResult,
    async (req, res) => {
        try {
            res.json(success);
        } catch (error) {
            manageRouterError(res, error);
        }
    }
);

// Enviar un mensaje.
// (Solo lo podrá hacer un profesor)
router.post(
    '/profesores/send',
    checkRole(alumnoRoleDescription),
    checkSchema(mensajeValidationSchema),
    checkValidationsResult,
    async (req, res) => {
        try {
            res.json(success);
        } catch (error) {
            manageRouterError(res, error);
        }
    }
);

module.exports = router;