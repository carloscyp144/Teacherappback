const router = require('express').Router();
const { checkSchema } = require('express-validator');

const { loginValidationSchema } = require('../../../helpers/validators/login.validator');
const { manageRouterError } = require('../../../helpers/router_utils');
const { checkValidationsResult } = require('../../../helpers/validator_utils');
const { getByEmailWithPassword } = require('../../../models/usuarios.model');
const { getRoleName, alumnoRoleId } = require('../../../models/roles.model');
const { getByUserId: getAlumnoByUserId } = require('../../../models/alumnos.model');
const bcrypt = require('bcrypt');
const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');
const { completeUser } = require("../../../models/completeUser");


// Login de un alumno.
router.post(
    '/', 
    checkSchema(loginValidationSchema),
    checkValidationsResult,
    async (req, res) => {
        try {
            const { email, password } = req.body;
            
            const user = await getByEmailWithPassword(email);
            if (!user) {
                return res.status(401)
                          .json({ errorMessage: 'El email y/o la contraseña no son correctos' })
            }

            // Para los alumnos (se pueden borrar)-->
            if (user.rolId === alumnoRoleId)
            {
                const alumno = await getAlumnoByUserId(user.id);
                if ((alumno == null) || (alumno.borrado)) {
                    return res.status(401)
                            .json({ errorMessage: 'El email y/o la contraseña no son correctos' })
                }
            }
            // <-- Para los alumnos

            const iguales = bcrypt.compareSync(password, user.password);
            if (!iguales) {
                return res.status(401)
                          .json({ errorMessage: 'El email y/o la contraseña no son correctos' })
            }

            const roleName  = getRoleName(user.rolId)
            const token     = createToken(user, roleName);

            delete user.password; // Aunque es el hash, mejor no devolverlo al front.

            const completedUser = await completeUser(user);
            
            const result     = {};
            result.token     = token;
            result[roleName] = completedUser;

            res.json(result);
        } catch (error) {
            manageRouterError(res, error);
        }
    }
)

const createToken = (user, roleName) => {
    const obj = {
        id: user.id,
        role: roleName,
        expiration_date: dayjs().add(process.env.TOKEN_EXPIRATION_HOURS, 'hours').unix()
    }

    return jwt.sign(obj, process.env.TOKEN_SECRET_KEY);
}

module.exports = router;