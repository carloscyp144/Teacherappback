const router = require('express').Router();
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const multer  = require('multer');
const { checkSchema } = require('express-validator');

const { checkValidationsResult } = require('../../../helpers/validator_utils');
const { updatePassword, updateImage, getById } = require('../../../models/usuarios.model');
const { manageRouterError } = require('../../../helpers/router_utils');
const { passwordValidationSchema } = require('../../../helpers/validators/password.validator');
const { success } = require('../../../helpers/success_utils');
const { getRoleName } = require('../../../models/roles.model');
const { completeUser } = require("../../../models/completeUser");

const avatarsDir = path.join(process.cwd(), './public/images/avatars');
const validFileExtensions = [ '.apng', '.avif', '.gif', '.jpg', '.jpeg', '.jfif', '.pjpeg', '.pjp', '.png', '.svg', '.webp']
const upload = multer({ dest: path.join(avatarsDir + '/tmp') });

router.get(
    '/mydata',
    async(req, res) => {
        try {
            const user = await getById(req.user.id);
            if (user === null) {
                return res.status(401)
                          .json({ messageError: 'No se pudo recuperar el usuario del token' });
            }

            const roleName      = getRoleName(user.rolId);
            const completedUser = await completeUser(user);
            
            const result     = {};
            result[roleName] = completedUser;

            res.json(result);
        } catch (error) {
            manageRouterError(res, error);
        }
    }
);

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

            res.json(success);
        } catch (error) {
            manageRouterError(res, error);
        }
    }
);

// Actualización de la imagen de un usuario.
// (Solo lo podrá hacer él mismo)
router.put(
    '/update/imagen',
    upload.single('imagen'),
    checkValidationsResult,
    async (req, res) => {
        try {
            const id = req.user.id;

            const tmpFile       = req.file.path;
            const fileExtension = path.extname(req.file.originalname).toLowerCase();

            if (!validFileExtensions.includes(fileExtension)) {
                fs.unlinkSync(tmpFile);

                return res.status(400)
                          .json({ messageError: 'Tipo de fichero incorrecto'});
            }
            
            const fileName   = `${id}${fileExtension}`;
            const targetFile = path.join(avatarsDir, fileName);
            fs.renameSync(tmpFile, targetFile);
            
            await updateImage(id, fileName);

            res.json(success);
        } catch (error) {
            manageRouterError(res, error);
        }
    }
);

module.exports = router;