const { getErrorFieldStr, ErrorType } = require('../errormsg_utils');

const searchValidationSchema = {
    'searchConditions.*.column': {
        exists: {
            errorMessage: getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'column')
        },
        trim: true
    },
    'searchConditions.*.operator': {
        exists: {
            errorMessage: getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'operator')
        },
        trim: true
    },
    'searchConditions.*.value': {
        exists: {
            errorMessage: getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'value')
        },
        trim: true
    },
    'orderByConditions.*.column': {
        exists: {
            errorMessage: getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'column')
        },
        trim: true
    },
    'orderByConditions.*.order': {
        exists: {
            errorMessage: getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'order')
        },
        trim: true,
        toLowerCase: true
    }
}

module.exports = { searchValidationSchema };