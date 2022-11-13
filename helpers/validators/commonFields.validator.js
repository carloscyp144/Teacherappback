const { getErrorFieldStr, ErrorType } = require('../errormsg_utils');

const getCommonFieldsValidationSchema = (modelGetByEmail, modelGetUserName, modelReferenceName) => {
    const commonFieldsValidationSchema = {
        userName: {
            exists: {
                errorMessage: getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'userName')
            },
            isLength: {
                options: { max: 25 },
                errorMessage: getErrorFieldStr(ErrorType.ERROR_MAX_LENGTH_FIELD, 'userName', '25')
            },
            custom: {
                options: async (value) => {
                    const modelObject = await modelGetUserName(value);
                    if (modelObject !== null) return Promise.reject(`Ya existe un ${modelReferenceName} con ese userName`);
                    Promise.resolve();
                },
                errorMessage: getErrorFieldStr(ErrorType.ERROR_ALREADY_EXISTS, 'userName', modelReferenceName)
            },
            trim: true
        },
        email: {
            exists: {
                errorMessage: getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'email')
            },
            isEmail: {
                errorMessage: getErrorFieldStr(ErrorType.ERROR_EMAIL_FIELD, 'email')
            },
            isLength: {
                options: { max: 50 },
                errorMessage: getErrorFieldStr(ErrorType.ERROR_MAX_LENGTH_FIELD, 'email', '45')
            },
            custom: {
                options: async (value) => {
                    const modelObject = await modelGetByEmail(value);                    
                    if (modelObject !== null) return Promise.reject(`Ya existe un ${modelReferenceName} con ese email`);
                    Promise.resolve();
                },
                errorMessage: getErrorFieldStr(ErrorType.ERROR_ALREADY_EXISTS, 'email', modelReferenceName)
            },
            trim: true
        },
        password: {
            exists: {
                errorMessage: getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'password')
            },
            isLength: {
                options: { min: 6 },
                errorMessage: getErrorFieldStr(ErrorType.ERROR_MIN_LENGTH_FIELD, 'password', '6')
            }
        }
    }
    return commonFieldsValidationSchema;
}

module.exports = { getCommonFieldsValidationSchema };