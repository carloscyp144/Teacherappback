const router = require('express').Router();
const bcrypt = require('bcrypt');
const { checkSchema } = require('express-validator');

const { checkValidationsResult } = require('../../../helpers/validator_utils');
const { updatePassword } = require('../../../models/usuarios.model');
const { manageRouterError } = require('../../../helpers/router_utils');
const { passwordValidationSchema } = require('../../../helpers/validators/password.validator');

// Actualización del password del usuario.
// (Solo lo podrá hacer él mismo)
router.put(
    '/update/password',
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

module.exports = router;