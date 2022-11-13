const { executeQuery, executeQueryOne } = require('../helpers/mysql_utils');

const no_key_columns = 'nombreCompleto, userName, email, password, borrado';

const create = ({ nombreCompleto, userName, email, password }) => {
    return executeQuery(
        `insert into posts (${no_key_columns}) values (?, ?, ?, ?, ?)`, 
        [ nombreCompleto, userName, email, categoria, autor_id ]
    );
}