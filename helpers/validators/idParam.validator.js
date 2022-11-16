const { param, exists, isInt } = require('express-validator');

const idParamValidator = param('id').exists().isInt();

module.exports = { idParamValidator };