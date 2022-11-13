const { getErrorFieldStr, ErrorType } = require("../errormsg_utils");

const alumnoValidationSchema = {
    /*titulo: {
        exists: {
            errorMessage: getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'titulo')
        },
        isLength: {
            options: { max: 100 },
            errorMessage: getErrorFieldStr(ErrorType.ERROR_MAX_LENGTH_FIELD, 'titulo', '100')
        }
    },
    descripcion: {
        exists: {
            errorMessage: getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'descripcion')
        },
        isLength: {
            options: { max: 300 },
            errorMessage: getErrorFieldStr(ErrorType.ERROR_MAX_LENGTH_FIELD, 'descripcion', '300')
        }
    },
    fecha_creacion: {
        exists: {
            errorMessage: getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'fecha_creacion')
        },
        isISO8601: {
            errorMessage: getErrorFieldStr(ErrorType.ERROR_DATE_FIELD, 'fecha_creacion')
        },
        toDate: true
    },
    categoria: {
        exists: {
            errorMessage: getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'categoria')
        },
        isLength: {
            options: { max: 50 },
            errorMessage: getErrorFieldStr(ErrorType.ERROR_MAX_LENGTH_FIELD, 'categoria', '50')
        }
    },
    autor_id: {
        exists: {
            errorMessage: getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'autor_id')
        },
        custom: {
            options: async (value) => {
                const autor = await getById(value);
                if (autor === null) return Promise.reject('No existe el autor');
                Promise.resolve();
            },
            errorMessage: getErrorFieldStr(ErrorType.ERROR_NO_EXISTS, 'autor_id', 'autor')
        }
    }*/
}

module.exports = { alumnoValidationSchema };