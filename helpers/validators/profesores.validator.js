const { getErrorFieldStr, ErrorType } = require('../errormsg_utils');
const { getCommonFieldsValidationSchema } = require('./commonFields.validator');
const { getByNombre, getById } = require('../../models/ramas.model');

const getProfesorValidationSchema = (creation) => {
    const profesorValidationSchema = {
        descripcion: {
            exists: {
                errorMessage: getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'descripcion')
            },
            isLength: {
                options: { max: 200 },
                errorMessage: getErrorFieldStr(ErrorType.ERROR_MAX_LENGTH_FIELD, 'descripcion', '200')
            },
            trim: true
        },
        precioHora: {
            exists: {
                errorMessage: getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'precioHora')
            },
            isDecimal: {
                options: { decimal_digits: '0,2' }, // No más de dos decimales.
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
        latitud: {
            exists: {
                errorMessage: getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'latitud')
            },
            isDecimal: {
                errorMessage: getErrorFieldStr(ErrorType.ERROR_DECIMAL, 'latitud')
            }
        },
        longitud: {
            exists: {
                errorMessage: getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'longitud')
            },
            isDecimal: {
                errorMessage: getErrorFieldStr(ErrorType.ERROR_DECIMAL, 'longitud')
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
        ramaId: {
            optional: true,
            isInt: {                        
                errorMessage: getErrorFieldStr(ErrorType.ERROR_INT, 'ramaId')
            },
            custom: {
                options: async (value) => {                    
                    const modelObject = await getById(value);
                    if (modelObject === null) return Promise.reject(`No existe una rama con ese id`);
                        Promise.resolve();
                },
                errorMessage: getErrorFieldStr(ErrorType.ERROR_NO_EXISTS, 'rama', 'ramaId')
            }                    
        },
        nombreRamaNueva: {
            isLength: {
                options: { max: 25 },
                errorMessage: getErrorFieldStr(ErrorType.ERROR_MAX_LENGTH_FIELD, 'nombre', '25')
            },
            custom: {
                options: async (value) => {
                    const modelObject = await getByNombre(value);
                    if (modelObject !== null) return Promise.reject(`Ya existe una rama con ese nombre`);
                        Promise.resolve();
                },
                errorMessage: getErrorFieldStr(ErrorType.ERROR_ALREADY_EXISTS, 'nombre', 'nombreRamaNueva')
            },
            trim: true                    
        },
        ...getCommonFieldsValidationSchema('profesor', creation)
    }
    return profesorValidationSchema;
}

module.exports = { getProfesorValidationSchema };