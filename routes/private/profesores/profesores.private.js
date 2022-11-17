const { checkSchema } = require('express-validator');
const { manageRouterError } = require('../../../helpers/router_utils');
const { success } = require('../../../helpers/success_utils');
const { checkRole } = require('../../../helpers/token_utils');
const { idParamValidator } = require('../../../helpers/validators/idParam.validator');
const { checkValidationsResult } = require('../../../helpers/validator_utils');
const { validate, getByUserId, updateConfigurationFieldsTrans } = require('../../../models/profesores.model');
const { adminRoleDescription, profesorRoleDescription } = require('../../../models/roles.model');
const { getProfesorValidationSchema } = require('../../../helpers/validators/profesores.validator');
const { updateUserFields } = require('../updateUserFields');

const router = require('express').Router();

// Validación de un profesor.
// (Solo lo podrá hacer un administrador)
router.put(
    '/validate/:id',
    checkRole(adminRoleDescription),
    idParamValidator,
    checkValidationsResult,
    async (req, res) => {
        try {
            const id = req.params.id;

            const result = await validate(id);
            if(result.affectedRows == 0){
                res.status(404)
                   .json({ messageError: 'No existe el profesor especificado' });
            }
            else {
                res.json(success);
            }
        } catch (error) {
            manageRouterError(res, error);
        }
    }
);

// Actualización de los datos de un profesor (menos el password).
// (Solo lo podrá hacer él mismo)
router.put(
    '/update/',
    checkRole(profesorRoleDescription),
    checkSchema(getProfesorValidationSchema(false)),
    checkValidationsResult,
    async (req, res) => {
        try {
            const usuarioId = req.user.id;
            const profesor  = await getByUserId(usuarioId);
            if (profesor === null) {
                return res.status(404)
                          .json({ messageError: 'No existe el profesor especificado' });
            }

            req.body.id = profesor.id;            

            updateUserFields(req, res, updateConfigurationFieldsTrans);
        } catch (error) {
            manageRouterError(res, error);
        }
    }
);

module.exports = router;