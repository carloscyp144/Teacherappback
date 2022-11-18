const { getPagesCountClause } = require('../helpers/searchUtils/countpages_utils');
const { executeQuery, executeQueryOne, executeQueryTrans } = require('../helpers/mysql_utils');

const key_columns    = 'id';
const no_key_columns = 'nombre';
const columns        = `${key_columns}, ${no_key_columns}`;

const getAll = () => {
    return Promise.all([
            executeQuery(`select ${columns} from ramas`),
            { "pages": 1 }
    ]);
}

const getByPage = (page, limit) => {
    return Promise.all([
            executeQuery(`select ${columns} from ramas order by id limit ? offset ?`, [ limit, (page - 1) * limit ]),
            executeQueryOne(`select ${getPagesCountClause(limit)} from ramas`)
    ]);
}

const createTransRama = (db, nombre) => {
    return executeQueryTrans(db, `insert into ramas (${no_key_columns}) values (?)`, [ nombre ]);
}

const getByNombre = (nombre) => {
    return executeQueryOne(
        `select ${columns} from ramas where (nombre = ?)`, 
        [ nombre ]
    );
}

const getById = (nombre) => {
    return executeQueryOne(
        `select ${columns} from ramas where (id = ?)`, 
        [ nombre ]
    );
}

module.exports = { getAll, getByPage, createTransRama, getByNombre, getById };