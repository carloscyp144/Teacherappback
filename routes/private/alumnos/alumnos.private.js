const router = require('express').Router();
const bcrypt = require('bcrypt');
const { checkSchema } = require('express-validator');

const { checkValidationsResult } = require('../../../helpers/validator_utils');
const { logicDelete } = require('../../../models/alumnos.model');
const { manageRouterError } = require('../../../helpers/router_utils');
const { getAlumnoValidationSchema } = require('../../../helpers/validators/alumnos.validator');
const { checkRole } = require('../../../helpers/token_utils');
const { success } = require('../../../helpers/success_utils');
const { idParamValidator } = require('../../../helpers/validators/idParam.validator');
const { alumnoRoleDescription, adminRoleDescription } = require('../../../models/roles.model');
const { updateUserFields } = require('../updateUserFields');

// Actualización de los datos de un alumno (menos el password).
// (Solo lo podrá hacer él mismo)
router.put(
    '/update/',
    checkRole(alumnoRoleDescription),
    checkSchema(getAlumnoValidationSchema(false)),
    checkValidationsResult,
    (req, res) => updateUserFields(req, res, () => {}) // Pasamos una función que no hace nada(solo hay que actualizar campos de la tabla usuarios
);

// Borrado lógico del usuario.
// (Solo lo podrá hacer un administrador)
router.delete(
    '/delete/:id',
    checkRole(adminRoleDescription),
    idParamValidator,
    checkValidationsResult,
    async (req, res) => {
        try {
            const id = req.params.id;
            
            const result = await logicDelete(id);
            if(result.affectedRows == 0){
                res.status(404)
                   .json({ messageError: 'No existe el alumno especificado' });
            }
            else {
                res.json(success);
            }
        } catch (error) {
            manageRouterError(res, error);
        }
    }
);

module.exports = router;