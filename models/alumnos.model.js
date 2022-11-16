const { executeQuery, executeQueryOne, executeQueryTrans, beginTransaction, commit, rollBack } = require('../helpers/mysql_utils');
const { createTransUsuario } = require('./usuarios.model');
const { alumnoRoleId } = require('./roles.model');

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

const logicDelete = (id) => {
    return executeQuery(
        `update alumnos set borrado = 1 where (id = ?)`, 
        [ id ]
    );
}

module.exports = { 
    create,
    getByUserId,
    logicDelete
};