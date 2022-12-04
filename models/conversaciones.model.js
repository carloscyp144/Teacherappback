const { executeQueryTrans, executeQueryOneTrans } = require('../helpers/mysql_utils');

const key_columns    = 'id';
const no_key_columns = 'profesoresId, alumnosId, borradaProfesor, borradaAlumno';
const columns        = `${key_columns}, ${no_key_columns}`;

const createTransConversacion = (db, profesoresId, alumnosId) => {    
    return executeQueryTrans(
        db,
        `insert into conversaciones (${no_key_columns}) values (?, ?, ?, ?)`, 
        [ profesoresId, alumnosId, 0, 0 ]
    );
}

const getByProfesorIdAlumnoIdTrans = (db, profesoresId, alumnosId) => {
    return executeQueryOneTrans(
        db,
        `select ${columns} from conversaciones where (profesoresId = ?) and (alumnosId = ?)`, 
        [ profesoresId, alumnosId ]
    );
}

const undeleteTrans = (db, id) => {
    return executeQueryTrans(
        db,
        `update conversaciones set borradaProfesor = ?, borradaAlumno = ? where (id = ?)`, 
        [ 0, 0, id ]
    );
}

module.exports = { createTransConversacion, getByProfesorIdAlumnoIdTrans, undeleteTrans };