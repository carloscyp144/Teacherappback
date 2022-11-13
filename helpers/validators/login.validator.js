const { getErrorFieldStr, ErrorType } = require('../errormsg_utils');

const loginValidationSchema = {
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

module.exports = { loginValidationSchema };