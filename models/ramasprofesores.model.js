const { executeQueryTrans } = require('../helpers/mysql_utils');

const no_key_columns = 'profesores_id, ramas_id';

const createTrans = (db, profesorId, ramaId) => {
    return executeQueryTrans(
        db,
        `insert into ramasprofesores (${no_key_columns}) values (?, ?)`, 
        [ profesorId, ramaId ]
    );
}

module.exports = { createTrans };