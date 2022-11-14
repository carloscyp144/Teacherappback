const { executeQueryTrans, executeQueryOne } = require('../helpers/mysql_utils');

const key_columns         = 'id';
const no_key_columns      = 'nombreCompleto, userName, email, descripcion, precioHora, experiencia, coordenadas, telefono, validado, puntuacionMedia, puntuacionTotal, numeroPuntuaciones';
const password_column     = 'password';
const columns             = `${key_columns}, ${no_key_columns}, ${password_column}`;
const no_password_columns = `${key_columns}, ${no_key_columns}`;

const createTrans = (db, { nombreCompleto, userName, email, descripcion, precioHora, experiencia, latitud, longitud, telefono, password }) => {
    return executeQueryTrans(
        db,
        `insert into profesores (${no_key_columns}, ${password_column}) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
        [ nombreCompleto, userName, email, descripcion, precioHora, experiencia, point(longitud, latitud) , telefono, 0, null, null, null, password ]
    );
}

const getByEmail = (email) => {
    return executeQueryOne(
        `select ${no_password_columns} from profesores where (email = ?)`, 
        [ email ]
    );
}

const getByUserName = (userName) => {
    return executeQueryOne(
        `select ${no_password_columns} from profesores where (userName = ?)`, 
        [ userName ]
    );
}

module.exports = { createTrans, getByEmail, getByUserName };

