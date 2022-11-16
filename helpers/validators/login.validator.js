const { getErrorFieldStr, ErrorType } = require('../errormsg_utils');
const { passwordValidationSchema } = require('./password.validator');

const loginValidationSchema = {
    email: {
        exists: {
            errorMessage: getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'email')
        },
        isEmail: {
            errorMessage: getErrorFieldStr(ErrorType.ERROR_EMAIL_FIELD, 'email')
        },
        isLength: {
            options: { max: 45 },
            errorMessage: getErrorFieldStr(ErrorType.ERROR_MAX_LENGTH_FIELD, 'email', '45')
        },
        trim: true
    },
    ...passwordValidationSchema    
}

module.exports = { loginValidationSchema };