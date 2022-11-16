const { manageRouterError } = require('../../../helpers/router_utils');
const { success } = require('../../../helpers/success_utils');
const { checkRole } = require('../../../helpers/token_utils');
const { idParamValidator } = require('../../../helpers/validators/idParam.validator');
const { checkValidationsResult } = require('../../../helpers/validator_utils');
const { validate } = require('../../../models/profesores.model');
const { adminRoleDescription } = require('../../../models/roles.model');

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


module.exports = router;