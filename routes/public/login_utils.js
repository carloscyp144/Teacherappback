const { manageRouterError } = require('../../helpers/router_utils');
const bcrypt = require('bcrypt');
const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');

const commonLogin = async (req, res, getByEmail) => {
    try {
        const { email, password } = req.body;
        
        const user = await getByEmail(email);
        if (!user) {
            return res.json({ errorMessage: 'El Email y/o la contraseña no son correctos' })
        }

        const iguales = bcrypt.compareSync(password, user.password);
        if (!iguales) {
            return res.json({ errorMessage: 'El Email y/o la contraseña no son correctos' })
        }

        res.json({            
            token: createToken(user),
            user
        });
    } catch (error) {
        manageRouterError(res, error);
    }
}

const createToken = (user, role) => {
    const obj = {
        user_id: user.id,
        user_role: role,
        expiration_date: dayjs().add(5, 'hours').unix()
    }

    return jwt.sign(obj, process.env.SECRET_KEY);
}

module.exports = { commonLogin };