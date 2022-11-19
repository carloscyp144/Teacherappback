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

router.post(
    '/opiniones/get', 
    checkSchema(opinionesPublicValidationSchema(opinionesSearchFields)),
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

module.exports = router;