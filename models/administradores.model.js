const { executeQuery, executeQueryOne } = require('../helpers/mysql_utils');

const key_columns         = 'id';
const no_key_columns      = 'nombreCompleto, userName, email';
const password_column     = 'password';
const columns             = `${key_columns}, ${no_key_columns}, ${password_column}`;

const create = ({ nombreCompleto, userName, email, password }) => {
    return executeQuery(
        `insert into administradores (${no_key_columns}, ${password_column}) values (?, ?, ?, ?)`, 
        [ nombreCompleto, userName, email, password ]
    );
}

const checkIsEmpty = () => {
    return executeQueryOne('SELECT (NOT EXISTS (SELECT 1 FROM administradores)) AS isEmpty');
}

module.exports = { create, checkIsEmpty };
