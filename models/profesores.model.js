const { executeQueryTrans, executeQueryOne } = require('../helpers/mysql_utils');

const key_columns          = 'id';
const no_key_columns       = 'nombreCompleto, userName, email, descripcion, precioHora, experiencia, coordenadas, telefono, validado, puntuacionMedia, puntacionTotal, numeroPuntuaciones';
const no_key_columnsLonLat = 'nombreCompleto, userName, email, descripcion, precioHora, experiencia, ST_X(coordenadas) AS longitud, ST_Y(coordenadas) AS latitud, telefono, validado, puntuacionMedia, puntacionTotal, numeroPuntuaciones';
const password_column      = 'password';
const columns              = `${key_columns}, ${no_key_columns}, ${password_column}`;
//const no_password_columns  = `${key_columns}, ${no_key_columns}`;
const no_password_columnsLonLat  = `${key_columns}, ${no_key_columnsLonLat}`;

const createTrans = (db, { nombreCompleto, userName, email, descripcion, precioHora, experiencia, latitud, longitud, telefono, password }) => {
    return executeQueryTrans(
        db,
        `insert into profesores (${no_key_columns}, ${password_column}) values (?, ?, ?, ?, ?, ?, POINT(${longitud}, ${latitud}), ?, ?, ?, ?, ?, ?)`, 
        [  nombreCompleto, userName, email, descripcion, precioHora, experiencia, telefono, 0, null, null, null, password ]
    );
}

const getById = (id) => {
    return executeQueryOne(
        `select ${no_password_columnsLonLat} from profesores where (id = ?)`, 
        [ id ]
    );
}
/*
const getByEmail = (email) => {
    return executeQueryOne(
        `select ${no_password_columnsLonLat} from profesores where (email = ?)`, 
        [ email ]
    );
}
*/
const getByUserName = (userName) => {    
    return executeQueryOne(
        `select ${no_password_columnsLonLat} from profesores where (userName = ?)`, 
        [ userName ]
    );
}

module.exports = { createTrans, getById/*, getByEmail*/, getByUserName };

