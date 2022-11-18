const { executeQuery, executeQueryOne, executeQueryTrans, beginTransaction, commit, rollBack } = require('../helpers/mysql_utils');
const { createTransUsuario } = require('./usuarios.model');
const { alumnoRoleId } = require('./roles.model');
const { getWhereOrderByLimitClauses } = require('../helpers/whereclause_utils');

const key_columns    = 'id';
const no_key_columns = 'borrado, usuariosId';
const columns        = `${key_columns}, ${no_key_columns}`;

const createTransAlumno = (db, borrado, usuariosId) => {    
    return executeQueryTrans(
        db,
        `insert into alumnos (${no_key_columns}) values (?, ?)`, 
        [ borrado, usuariosId]
    );
}

const create = async (fields) => {
    const db = await beginTransaction();
    let id, usuarioId;
    try {        
        usuarioId = (await createTransUsuario(db, {...fields, rolId: alumnoRoleId})).insertId;
        id        = (await createTransAlumno (db, 0, usuarioId                    )).insertId;

        await commit(db);
    } catch(exception) {
        await rollBack(db);
        throw exception;
    }

    delete fields.password;
    
    return { usuarioId, rolId: alumnoRoleId, id, ...fields, borrado: 0} ;
}

const getByUserId = (usuariosId) => {
    return executeQueryOne(
        `select id, borrado, usuariosId as usuarioId from alumnos where (usuariosId = ?)`, 
        [ usuariosId ]
    );
}

const getWithQuery = ({ searchConditions, orderByConditions }, page, limit) => {    

    let selectSentence = 'select a.id, borrado, usuariosId as usuarioId, userName, nombreCompleto, email, rolId ' +
                         'from alumnos as a inner join usuarios as u on (a.usuariosId = u.id)';
                         
    const fields        = ['id', 'borrado', 'usuariosId', 'userName', 'nombreCompleto', 'email', 'rolId'];
    const clauses       = getWhereOrderByLimitClauses(fields, searchConditions, orderByConditions, limit, page);    
    if (clauses != '') {
        selectSentence += clauses;
    }

    return executeQuery(
        selectSentence, 
        [ ]
    );

}

const logicDelete = (id) => {
    return executeQuery(
        `update alumnos set borrado = 1 where (id = ?)`, 
        [ id ]
    );
}

const logicUndelete = (id) => {
    return executeQuery(
        `update alumnos set borrado = 0 where (id = ?)`, 
        [ id ]
    );
}

module.exports = { 
    create,
    getByUserId,
    getWithQuery,
    logicDelete,
    logicUndelete
};