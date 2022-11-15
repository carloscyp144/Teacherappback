const { executeQuery, executeQueryOne, beginTransaction, commit } = require('../helpers/mysql_utils');
const { create: createUser } = require('./usuarios.model');
const { alumnoRoleId } = require('./roles.model');

const key_columns    = 'id';
const no_key_columns = 'borrado, usuariosId';
const columns        = `${key_columns}, ${no_key_columns}`;

const create = async ({ userName, nombreCompleto, email, password }) => {
    const db = beginTransaction();
    let result;
    try {
        const userId = (await createUser({userName, nombreCompleto, email, password, alumnoRoleId})).insertId;
        result = await executeQuery(
            `insert into alumnos (${no_key_columns}) values (?, ?)`, 
            [ 0, userId ]
        );

        commit(db);
    } catch(exception) {
        rollBack(db);
        throw exception;
    }
    return {
        id: result.insertId,
        userName,
        nombreCompleto,
        email,
        borrado: false
    }
}

const logicDelete = (id) => {
    return executeQuery(
        `update alumnos set borrado = 1 where (id = ?)`, 
        [ id ]
    );
}

module.exports = { 
    create,
    logicDelete
};