const { getErrorFieldStr, ErrorType } = require('../errormsg_utils');
const { getByEmail, getByUserName } = require('../../models/profesores.model');
const { getCommonFieldsValidationSchema } = require('./commonFields.validator');
const { getByNombre } = require('../../models/ramas.model');

const getProfesorValidationSchema = (creation) => {
    const profesorValidationSchema = {
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
        ...getCommonFieldsValidationSchema(getByEmail, getByUserName, 'profesor', creation),
        description: {
            exists: {
                errorMessage: getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'description')
            },
            isLength: {
                options: { max: 200 },
                errorMessage: getErrorFieldStr(ErrorType.ERROR_MAX_LENGTH_FIELD, 'description', '200')
            },
            trim: true
        },
        precioHora: {
            exists: {
                errorMessage: getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'precioHora')
            },
            isDecimal: {
                options: { decimal_digits: ',2' }, // No más de dos decimales.
                errorMessage: getErrorFieldStr(ErrorType.ERROR_MAX_DECIMALS, 'precioHora', '2')
            },
            isFloat: {
                options: {
                    min: 0,
                    max: 999.99
                },
                errorMessage: getErrorFieldStr(ErrorType.ERROR_DECIMAL_MIN_MAX, 'precioHora', '0 y 999.99')
            }
        },
        experiencia: {
            exists: {
                errorMessage: getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'experiencia')
            },
            isInt: {
                options: {
                    min: 0,
                    max: 99
                },
                errorMessage: getErrorFieldStr(ErrorType.ERROR_INT_MIN_MAX, 'experiencia', '0 y 99')
            }
        },
        telefono: {
            exists: {
                errorMessage: getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'telefono')
            },
            isLength: {
                options: { max: 12 },
                errorMessage: getErrorFieldStr(ErrorType.ERROR_MAX_LENGTH_FIELD, 'telefono', '12')
            },
            trim: true
        },
        "ramas.*.ramaId": {
            exists: {
                errorMessage: getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'ramaId')
            },
            isInt: {                        
                errorMessage: getErrorFieldStr(ErrorType.ERROR_INT, 'ramaId')
            }                    
        },
        "nuevasRamas.*.nombre": {
            exists: {
                errorMessage: getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'nombre')
            },
            isLength: {
                options: { max: 25 },
                errorMessage: getErrorFieldStr(ErrorType.ERROR_MAX_LENGTH_FIELD, 'nombre', '25')
            },
            custom: {
                options: async (value) => {
                    const modelObject =  await getByNombre(value);
                    if (modelObject !== null) return Promise.reject(`Ya existe una rama con ese nombre`);
                        Promise.resolve();
                },
                errorMessage: getErrorFieldStr(ErrorType.ERROR_ALREADY_EXISTS, 'nombre', 'rama')
            },
            trim: true                    
        }
    }
    return profesorValidationSchema;
}

module.exports = { getProfesorValidationSchema };