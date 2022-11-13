const { manageRouterError } = require('../../helpers/router_utils');
const bcrypt = require('bcrypt');
const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');

const commonLogin = async (req, res, getByEmailWithPassword, role) => {
    try {
        const { email, password } = req.body;
        
        const user = await getByEmailWithPassword(email);
        if (!user) {
            return res.json({ errorMessage: 'El Email y/o la contraseña no son correctos' })
        }

        // Para los alumnos (se pueden borrar)-->        
        if (user.borrado)
        {
            return res.json({ errorMessage: 'El Email y/o la contraseña no son correctos' })
        }
        // <-- Para los alumnos

        const iguales = bcrypt.compareSync(password, user.password);
        if (!iguales) {
            return res.json({ errorMessage: 'El Email y/o la contraseña no son correctos' })
        }

        delete user.password; // Aunque es el hash, mejor no devolverlo al front.

        res.json({            
            token: createToken(user, role),
            user
        });
    } catch (error) {
        manageRouterError(res, error);
    }
}

const createToken = (user, role) => {
    const obj = {
        id: user.id,
        role: role,
        expiration_date: dayjs().add(process.env.TOKEN_EXPIRATION_HOURS, 'hours').unix()
    }

    return jwt.sign(obj, process.env.TOKEN_SECRET_KEY);
}

module.exports = { commonLogin };