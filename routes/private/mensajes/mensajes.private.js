const router = require('express').Router();

const { checkSchema } = require('express-validator');
const { manageRouterError } = require('../../../helpers/router_utils');
const { success } = require('../../../helpers/success_utils');
const { checkRoles } = require('../../../helpers/token_utils');
const { mensajeValidationSchema } = require('../../../helpers/validators/mensaje.validator');
const { checkValidationsResult } = require('../../../helpers/validator_utils');
const { getByUserId: getAlumnoByUserId } = require('../../../models/alumnos.model');
const { create, getMensajes } = require('../../../models/mensajes.model');
const { getByUserId: getProfesorByUserId } = require('../../../models/profesores.model');
const { profesorRoleDescription, alumnoRoleDescription } = require('../../../models/roles.model');

// Enviar un mensaje.
// (Solo lo podrá hacer un alumno o un profesor)
router.post(
    '/send',
    checkRoles([alumnoRoleDescription, profesorRoleDescription]),
    checkSchema(mensajeValidationSchema),
    checkValidationsResult,
    async (req, res) => {
        try {
            let alumnoUserId, profesorUserId;            
            if (req.user.role === alumnoRoleDescription) {                
                // El que envía es un alumno.
                alumnoUserId   = req.user.id;
                profesorUserId = req.body.idUsuarioDestino;
            } else {                
                // El que envía es un profesor.
                alumnoUserId   = req.body.idUsuarioDestino;
                profesorUserId = req.user.id;
            }

            const alumno = await getAlumnoByUserId(alumnoUserId);
            if ((alumno === null) || (alumno.borrado)) {
                return res.status(404)
                          .json({ messageError: 'No existe el alumno especificado' });
            }

            const profesor = await getProfesorByUserId(profesorUserId);
            if ((profesor === null) || (!profesor.validado)) {
                return res.status(404)
                          .json({ messageError: 'No existe el profesor especificado' });
            }

            let autor, destinatario;
            if (req.user.role === alumnoRoleDescription) {                
                // El que envía es un alumno.
                autor        = alumno.id;
                destinatario = profesor.id;
            } else {                
                // El que envía es un profesor.
                autor        = profesor.id;
                destinatario = alumno.id;
            }

            const mensaje = await create(profesor.id, alumno.id, autor, destinatario, req.body.texto);

            res.json(mensaje);
        } catch (error) {
            manageRouterError(res, error);
        }
    }
);

// Recuperar mensajes.
// (Solo lo podrá hacer un alumno o un profesor)
router.get(
    '/allmessages',
    checkRoles([alumnoRoleDescription, profesorRoleDescription]),
    async (req, res) => {
        try {
            let profesorId, alumnoId;
            if (req.user.role === alumnoRoleDescription) {                
                // Mensajes de un alumno.
                const alumno = await getAlumnoByUserId(req.user.id);
                if ((alumno === null) || (alumno.borrado)) {                    
                    return res.status(404)
                              .json({ messageError: 'No existe el alumno especificado' });
                }
                profesorId = null;
                alumnoId   = alumno.id;
            } else {                
                // Mensajes de un profesor.
                const profesor = await getProfesorByUserId(req.user.id);
                if ((profesor === null) || (!profesor.validado)) {
                    return res.status(404)
                              .json({ messageError: 'No existe el profesor especificado' });
                }
                profesorId = profesor.id;
                alumnoId   = null;
            }

            const conversaciones = await getMensajes(profesorId, alumnoId);

            res.json(conversaciones);
        } catch (error) {
            manageRouterError(res, error);
        }
    }
);

module.exports = router;