// Añadimos este objeto y esta función para que todos los mensajes
// de error devueltos por las validaciones sean consistentes.
// Aquí se podrían también traducir, recuperar de una base de datos...

const FIELD_STR = '&&&';
const VALUE_STR = '$$$';

const ErrorType = {
    ERROR_MANDATORY_FIELD:   `El campo ${FIELD_STR} es obligatorio`,
    ERROR_MAX_LENGTH_FIELD:  `El tamaño máximo del campo ${FIELD_STR} es de ${VALUE_STR} caracteres`,
    ERROR_EMAIL_FIELD:       `El campo ${FIELD_STR} no es un correo electrónico válido`,
    ERROR_URL_FIELD:         `El campo ${FIELD_STR} no es una URL válida`,
    ERROR_NO_EXISTS:         `No existe ${VALUE_STR} con la clave indicada en ${FIELD_STR}`,
    ERROR_DATE_FIELD:        `El campo ${FIELD_STR} no es una fecha válida`
}

const getErrorFieldStr = (error, fieldName, valueStr) => {
    const str = (valueStr) ? error.replace(VALUE_STR, valueStr) : error;
    return str.replace(FIELD_STR, fieldName);
};

module.exports = { ErrorType, getErrorFieldStr };