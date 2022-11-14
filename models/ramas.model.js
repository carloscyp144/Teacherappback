const { executeQuery } = require('../helpers/mysql_utils');

const key_columns         = 'id';
const no_key_columns      = 'nombre';
const columns             = `${key_columns}, ${no_key_columns}`;

const getAll = () => {
    return executeQuery(`select ${columns} from ramas`);
}

const getByPage = (page, limit) => {
    return executeQuery(`select ${columns} from ramas order by id limit ? offset ?`, [ limit, (page - 1) * limit ]);
}

module.exports = { getAll, getByPage };