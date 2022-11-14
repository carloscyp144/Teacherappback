const router = require('express').Router();
const bcrypt = require('bcrypt');
const { checkSchema } = require('express-validator');

const { checkValidationsResult } = require('../../../helpers/validator_utils');
const { getById, updateNotPasswordFields, getByEmailNotId, getByUserNameNotId, updatePassword, logicDelete } = require('../../../models/alumnos.model');
const { manageRouterError } = require('../../../helpers/router_utils');
const { getAlumnoValidationSchema } = require('../../../helpers/validators/alumnos.validator');
const { passwordValidationSchema } = require('../../../helpers/validators/password.validator');
const { getErrorFieldStr, ErrorType } = require('../../../helpers/errormsg_utils');
const { checkRole } = require('../../../helpers/token_utils');

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
            let alumno = await getByEmailNotId(req.body.email, id);
            if (alumno !== null) {                
                return res.status(400)
                          .json({ errorMessage: getErrorFieldStr(ErrorType.ERROR_ALREADY_EXISTS, 'email', 'alumno') });
            }

            // Lo mismo para el userName
            alumno = await getByUserNameNotId(req.body.userName, id);
            if (alumno !== null) {
                return res.status(400)
                          .json({ errorMessage: getErrorFieldStr(ErrorType.ERROR_ALREADY_EXISTS, 'userName', 'alumno') });
            }

            //req.body.password = bcrypt.hashSync(req.body.password, 8);
            
            await updateNotPasswordFields(id, req.body);
            alumno = await getById(id);

            res.json(alumno);
        } catch (error) {
            manageRouterError(res, error);
        }
    }
);

// Actualización del password del usuario.
// (Solo lo podrá hacer él mismo)
router.put(
    '/update/password',
    checkRole('alumno'),
    checkSchema(passwordValidationSchema),
    checkValidationsResult,
    async (req, res) => {
        try {
            const id = req.user.id;
            const password = bcrypt.hashSync(req.body.password, 8);            
            await updatePassword(id, password);

            res.json({ success: true });
        } catch (error) {
            manageRouterError(res, error);
        }
    }
);

// Borrado lógico del usuario.
// (Solo lo podrá hacer un administrador)
router.delete(
    '/delete/:id',
    checkRole('administrador'),
    async (req, res) => {
        try {
            // Validar el id.
            const id = req.params.id;
            
            const result = await logicDelete(id);
            console.log(result);
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