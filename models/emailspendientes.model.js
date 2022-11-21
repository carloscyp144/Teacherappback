const { executeQueryOne, executeQueryTrans } = require('../helpers/mysql_utils');

const EmailTypes = {
    ALTA_PROFESOR: 1
}

const key_columns    = 'id';
const no_key_columns = 'emailType, referenciaId';
const columns        = `${key_columns}, ${no_key_columns}`;

const createTransEmailPendiente = (db, emailType, referenciaId) => {
    return executeQueryTrans(db, `insert into emailspendientes (${no_key_columns}) values (?, ?)`, [ emailType, referenciaId ]);
}

const getFrom = (fromId) => {
    //const fromIdStr = (fromId) ? `where (id > ${fromId})` : '';
    return executeQueryOne(
        `select ${columns} from emailspendientes ${(fromId) ? `where (id > ${fromId})` : ''} order by id limit 1`, 
        [ ]
    );
}

const remove = (id) => {
    return executeQueryOne(
        `delete from emailspendientes where id = ?`, 
        [ id ]
    );
}

module.exports = { createTransEmailPendiente, getFrom, remove, EmailTypes };