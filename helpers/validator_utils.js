const { validationResult } = require('express-validator');

// Middleware que comprueba si se ha producido algún error
// en la validaciones.
const checkValidationsResult = (req, res, next) => {    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.mapped());
    }
    next();
}

module.exports = { checkValidationsResult };