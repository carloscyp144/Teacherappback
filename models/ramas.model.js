const { executeQuery, executeQueryOne, executeQueryTrans } = require('../helpers/mysql_utils');

const key_columns    = 'id';
const no_key_columns = 'nombre';
const columns        = `${key_columns}, ${no_key_columns}`;

const getAll = () => {
    return executeQuery(`select ${columns} from ramas`);
}

const getByPage = (page, limit) => {
    return executeQuery(`select ${columns} from ramas order by id limit ? offset ?`, [ limit, (page - 1) * limit ]);
}

const createTrans = (db, nombre) => {
    return executeQueryTrans(db, `insert into ramas (${no_key_columns}) values (?)`, [ nombre ]);
}

const getByNombre = (nombre) => {
    return executeQueryOne(
        `select ${columns} from ramas where (nombre = ?)`, 
        [ nombre ]
    );
}
module.exports = { getAll, getByPage, createTrans, getByNombre };