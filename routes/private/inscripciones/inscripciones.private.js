const router = require('express').Router();

const { idParamValidator } = require('../../../helpers/validators/idParam.validator');
const { checkValidationsResult } = require('../../../helpers/validator_utils');
const { alumnoRoleDescription } = require('../../../models/roles.model');
const { getByUserId } = require('../../../models/alumnos.model');
const { create } = require('../../../models/inscripciones.model');
const { checkRole } = require('../../../helpers/token_utils');
const { manageRouterError } = require('../../../helpers/router_utils');
const { getById } = require('../../../models/profesores.model');
const { success } = require('../../../helpers/success_utils');

// Inscribirse con un profesor.
// (Solo lo podrá hacer un alumno)
router.post(
    '/signup/:id',
    checkRole(alumnoRoleDescription),
    idParamValidator,
    checkValidationsResult,
    async (req, res) => {
        try {
            const idUsuario  = req.user.id;
            const idAlumno   = (await getByUserId(idUsuario)).id;
            const idProfesor = req.params.id;

            const profesor   = await getById(idProfesor);
            if (profesor === null) {
                res.status(404)
                   .json({ messageError: 'No existe el profesor especificado' });
                return;
            }
            
            await create(idAlumno, idProfesor);

            res.json(success);
        } catch (error) {
            manageRouterError(res, error);
        }
    }
);

module.exports = router;