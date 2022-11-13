const { getErrorFieldStr, ErrorType } = require('../errormsg_utils');
const { getByEmail, getByUserName } = require('../../models/alumnos.model');
const { getCommonFieldsValidationSchema } = require('./commonFields.validator');

const alumnoValidationSchema = {
    nombreCompleto: {
        exists: {
            errorMessage: getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'nombreCompleto')
        },
        isLength: {
            options: { max: 45 },
            errorMessage: getErrorFieldStr(ErrorType.ERROR_MAX_LENGTH_FIELD, 'nombreCompleto', '45')
        },
        trim: true
    },
    ...getCommonFieldsValidationSchema(getByEmail, getByUserName, 'alumno')
}

module.exports = { alumnoValidationSchema };