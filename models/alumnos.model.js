const { executeQuery, executeQueryOne } = require('../helpers/mysql_utils');

const key_columns         = 'id';
const no_key_columns      = 'nombreCompleto, userName, email, borrado';
const password_column     = 'password';
const columns             = `${key_columns}, ${no_key_columns}, ${password_column}`;
const no_password_columns = `${key_columns}, ${no_key_columns}`;

const create = ({ nombreCompleto, userName, email, password }) => {
    return executeQuery(
        `insert into alumnos (${no_key_columns}, ${password_column}) values (?, ?, ?, ?, ?)`, 
        [ nombreCompleto, userName, email, 0, password ]
    );
}

const updateNotPasswordFields = (id, { nombreCompleto, userName, email }) => {
    return executeQuery(
        `update alumnos set nombreCompleto = ?, userName = ?, email = ? where (id = ?)`, 
        [ nombreCompleto, userName, email, id ]
    );
}

const updatePassword = (id, password) => {
    return executeQuery(
        `update alumnos set password = ? where (id = ?)`, 
        [ password, id ]
    );
}

const logicDelete = (id) => {
    return executeQuery(
        `update alumnos set borrado = 1 where (id = ?)`, 
        [ id ]
    );
}

const getByEmail = (email) => {
    return executeQueryOne(
        `select ${no_password_columns} from alumnos where (email = ?)`, 
        [ email ]
    );
}

const getByEmailWithPassword = (email) => {
    return executeQueryOne(
        `select ${columns} from alumnos where (email = ?)`, 
        [ email ]
    );
}

const getByEmailNotId = (email, id) => {
    return executeQueryOne(
        `select ${no_password_columns} from alumnos where (email = ?) and (id <> ?)`, 
        [ email, id ]
    );
}

const getByUserName = (userName) => {
    return executeQueryOne(
        `select ${no_password_columns} from alumnos where (userName = ?)`, 
        [ userName ]
    );
}

const getByUserNameNotId = (userName, id) => {
    return executeQueryOne(
        `select ${no_password_columns} from alumnos where (userName = ?) and (id <> ?)`, 
        [ userName, id ]
    );
}

const getById = (id) => {
    return executeQueryOne(
        `select ${no_password_columns} from alumnos where (id = ?)`, 
        [ id ]
    );
}

module.exports = { 
    create, 
    getByEmail, 
    getByEmailWithPassword, 
    getByEmailNotId, 
    getByUserName, 
    getByUserNameNotId, 
    getById,
    logicDelete, 
    updateNotPasswordFields,
    updatePassword
};