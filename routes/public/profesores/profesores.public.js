const router = require('express').Router();
const bcrypt = require('bcrypt');
const { checkSchema } = require('express-validator');
const { create, getById, searchPublic, searchFieldsPublic } = require('../../../models/profesores.model');
const { getById: getUsuarioById } = require('../../../models/usuarios.model');
const { checkValidationsResult } = require('../../../helpers/validator_utils');
const { manageRouterError } = require('../../../helpers/router_utils');
const { getProfesorValidationSchema } = require('../../../helpers/validators/profesores.validator');
const { publicTeacherSearchValidationSchema } = require('../../../helpers/validators/profesorespublic_search.validator');
const { pageLimitValidationSchema } = require('../../../helpers/validators/pagelimit.validator');
const { formatSearchResult } = require('../../../helpers/searchUtils/searchresult_utils');
const { validateToken } = require('../../../helpers/token_utils');
const { opinionesPublicValidationSchema } = require('../../../helpers/validators/opinionespublic.validator');
const { searchOpiniones, searchOpinionesFields } = require('../../../models/inscripciones.model');

// Creación de un nuevo profesor.
router.post(
    '/register', 
    checkSchema(getProfesorValidationSchema(true)),
    checkValidationsResult,
    async (req, res) => {
        try {
            req.body.password = bcrypt.hashSync(req.body.password, 8);

            const profesorId = await create(req.body);
            profesor = await getById(profesorId);
            usuario  = await getUsuarioById(profesor.usuarioId);
            delete usuario.id;
            res.json({...usuario, ...profesor});
        } catch (error) {
            manageRouterError(res, error);
        }
    }
);

// Búsqueda de profesores de la parte pública. A diferencia de en la parte privada,
// aquí se pasa como criterio de búsqueda unas coordenadas y una distancia máxima a
// ese punto. Por lo demás, se reciben los criterios de búsqueda, ordenación y pagi-
// nación de cualquier petición de búsqueda.
// IMPORTANTE: si estamos con un token válido, además podremos ver los datos de
// contanto del profesor (email y teléfono)
router.post(
    '/getSearch', 
    checkSchema(publicTeacherSearchValidationSchema(searchFieldsPublic)),
    checkSchema(pageLimitValidationSchema),
    checkValidationsResult,
    async (req, res) => {        
        try {
            const { page, limit } = req.query;

            const logged = await validateToken(req);

            profesores = await searchPublic(req.body, logged, page, limit);
            
            res.json(formatSearchResult(profesores));
        } catch (error) {            
            manageRouterError(res, error);
        }
    }
);

// Opiniones de un profesor.
router.post(
    '/opiniones/get', 
    checkSchema(opinionesPublicValidationSchema(searchOpinionesFields)),
    checkSchema(pageLimitValidationSchema),
    checkValidationsResult,
    async (req, res) => {        
        try {
            const { page, limit } = req.query;

            const opiniones = await searchOpiniones(req.body, page, limit);
            
            res.json(formatSearchResult(opiniones));
        } catch (error) {            
            manageRouterError(res, error);
        }
    }
);

module.exports = router;