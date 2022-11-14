const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');

const { getById } = require('../models/alumnos.model');

const checkToken = async (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.status(401)
                  .json({ errorMessage: 'Debes incluir el token de autenticación' });
    }

    let { authorization: token } = req.headers;    

    token = token.replace('Bearer ', ''); // Para los que vienen de swagger.

    let obj;
    try {
        obj = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    } catch (error) {
        return res.status(401)
                  .json({ errorMessage: 'El token incluido no es válido' });
    }

    if (obj.expiration_date < dayjs().unix()) {
        return res.status(401)
                  .json({ errorMessage: 'El token está caducado' });
    }

    if (obj.role === 'alumno') {
        const alumno = await getById(obj.id);
        if ((alumno === null) || (alumno.borrado))
        {
            return res.status(401)
                      .json({ errorMessage: 'El usuario se ha borrado' });
        }
    }

    req.user = obj;

    next();
}

const checkRole = (role) => {
    return (req, res, next) => {        
        if (req.user.role !== role) {
            return res.status(401)
                      .json({ errorMessage: `Restringido el acceso. Solo usuarios con rol: ${role}` });
        }
        next();
    }
}

module.exports = { checkToken, checkRole };