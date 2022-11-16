const router = require('express').Router();
const bcrypt = require('bcrypt');
const { checkSchema } = require('express-validator');

const { checkValidationsResult } = require('../../../helpers/validator_utils');
const { updateNotPasswordFields, getByEmailNotId, getByUserNameNotId, getById } = require('../../../models/usuarios.model');
const { logicDelete } = require('../../../models/alumnos.model');
const { manageRouterError } = require('../../../helpers/router_utils');
const { getAlumnoValidationSchema } = require('../../../helpers/validators/alumnos.validator');
const { getErrorFieldStr, ErrorType } = require('../../../helpers/errormsg_utils');
const { checkRole } = require('../../../helpers/token_utils');
const { completeUser } = require('../../../models/completeUser');

// Actualización de los datos de un alumno (menos el password).
// (Solo lo podrá hacer él mismo)
router.put(
    '/update/',
    checkRole('alumno'),
    checkSchema(getAlumnoValidationSchema(false)),
    checkValidationsResult,
    async (req, res) => {
        try {
            const id = req.user.id;

            // Validamos que el email no lo tenga otro usuario con otro id distinto
            // (no sé como pasarlo al validador)
            let usuario = await getByEmailNotId(req.body.email, id);
            if (usuario !== null) {                
                return res.status(400)
                          .json({ errorMessage: getErrorFieldStr(ErrorType.ERROR_ALREADY_EXISTS, 'email', 'alumno') });
            }

            // Lo mismo para el userName
            usuario = await getByUserNameNotId(req.body.userName, id);
            if (usuario !== null) {
                return res.status(400)
                          .json({ errorMessage: getErrorFieldStr(ErrorType.ERROR_ALREADY_EXISTS, 'userName', 'alumno') });
            }

            await updateNotPasswordFields(id, req.body);
            usuario = await getById(id);
            const completedUsuario = await completeUser(usuario);

            res.json(completedUsuario);
        } catch (error) {
            manageRouterError(res, error);
        }
    }
);

// Borrado lógico del usuario.
// (Solo lo podrá hacer un administrador)
router.delete(
    '/delete/:id',
    checkRole('admin'),
    async (req, res) => {
        try {
            // Validar el id.
            const id = req.params.id;
            
            const result = await logicDelete(id);
            if(result.affectedRows == 0){
                res.status(404)
                   .json({ messageError: 'No existe el alumno especificado' });
            }
            else {
                res.json({ success: true });
            }
        } catch (error) {
            manageRouterError(res, error);
        }
    }
);

module.exports = router;