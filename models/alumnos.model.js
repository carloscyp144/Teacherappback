const { executeQuery, executeQueryOne } = require('../helpers/mysql_utils');

const key_columns    = 'id';
const no_key_columns = 'nombreCompleto, userName, email, password, borrado';
const columns        = `${key_columns}, ${no_key_columns}`;

const create = ({ nombreCompleto, userName, email, password }) => {
    return executeQuery(
        `insert into alumnos (${no_key_columns}) values (?, ?, ?, ?, ?)`, 
        [ nombreCompleto, userName, email, password, 0 ]
    );
}

const getByEmail = (email) => {
    return executeQueryOne(
        `select ${columns} from alumnos where (email = ?)`, 
        [ email ]
    );
}

const getByUserName = (userName) => {
    return executeQueryOne(
        `select ${columns} from alumnos where (userName = ?)`, 
        [ userName ]
    );
}

const getById = (id) => {
    return executeQueryOne(
        `select ${columns} from alumnos where (id = ?)`, 
        [ id ]
    );
}

module.exports = { create, getByEmail, getByUserName, getById };