const dayjs = require('dayjs');
const { executeQuery, executeQueryOne, executeQueryOneTrans } = require('../helpers/mysql_utils');
const { getWhereClause, getOrderByClause, getLimitClause } = require('../helpers/searchUtils/whereclause_utils');

const key_columns    = 'id';
const no_key_columns = 'estado, puntuacion, comentario, fechaPuntuacion, alumnosId, profesoresId';
const columns        = `${key_columns}, ${no_key_columns}`;

const create = (alumnoId, profesoresId) => {
    return executeQuery(
        `insert into inscripciones (${no_key_columns}) values (?, ?, ?, ?, ?, ?)`,
        [ 0, null, null, null, alumnoId, profesoresId ]
    );
}

const accept = (id) => {
    return executeQuery(
        `update inscripciones set estado = 1 where (id = ?)`,
        [ id ]
    );
}

const opinionTrans = (db, { id, puntuacion, comentario }) => {
    return executeQueryOneTrans(
        db,
        `update inscripciones set puntuacion = ?, comentario = ?, fechaPuntuacion = ? where (id = ?)`,
        [ puntuacion, comentario, dayjs().format('YYYY-MM-DD'), id ]
    );
}

const getById = (id) => {
    return executeQueryOne(
        `select ${columns} from inscripciones where (id = ?)`, 
        [ id ]
    );
}

const searchFields = [ 'puntuacion', 'comentario', 'fechaPuntuacion',];
const searchOpiniones = ({ searchConditions, orderByConditions, id: idProfesor }, page, limit) => {    

    const fieldsResult = 'puntuacion, comentario, fechaPuntuacion';
    let selectSentence = 'select ? from inscripciones';                         
    
    const whereClause   = getWhereClause(searchFields, searchConditions, '', `(profesoresId = ${idProfesor}) and (puntuacion is not null)`);
    const orderByClause = getOrderByClause(searchFields, orderByConditions, '');
    const limitClause   = getLimitClause(limit, page);

    return Promise.all([
            // No vale, mete comillas --> executeQuery(selectSentence, [fieldsResult]),
            executeQuery(selectSentence.replace('?', fieldsResult) + whereClause + orderByClause + limitClause, []),
            limit ? executeQueryOne(selectSentence.replace('?', getPagesCountClause(limit)) + whereClause, [])
                  : { pages: 1 }
    ]);
}

module.exports = { create, accept, getById, opinionTrans, searchOpiniones, searchFields };