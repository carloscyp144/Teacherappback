const { executeQueryTrans, executeQueryOne, beginTransaction, rollBack, commit, executeQuery } = require('../helpers/mysql_utils');
const { createTransUsuario } = require('./usuarios.model');
const { createTransRama } = require('./ramas.model');
const { createTransEmailPendiente, EmailTypes } = require('./emailspendientes.model');
const { profesorRoleId } = require('./roles.model');
const { getWhereClause, getOrderByClause, getLimitClause } = require('../helpers/searchUtils/whereclause_utils');
const { getPagesCountClause } = require('../helpers/searchUtils/countpages_utils');
const { sendMailDataLoaded } = require('../helpers/email/email_from_model');

const key_columns          = 'id';
const no_key_columns       = 'descripcion, precioHora, experiencia, coordenadas, telefono, validado, puntuacionMedia, puntuacionTotal, numeroPuntuaciones, usuarioId, ramaId';
const no_key_columnsLonLat = 'descripcion, precioHora, experiencia, ST_X(coordenadas) AS longitud, ST_Y(coordenadas) AS latitud, telefono, validado, puntuacionMedia, puntuacionTotal, numeroPuntuaciones, usuarioId, ramaId';

const createTransProfesor = (db, { descripcion, precioHora, experiencia, latitud, longitud, telefono, usuarioId, ramaId }) => {    
    return executeQueryTrans(
        db,
        `insert into profesores (${no_key_columns}) values (?, ?, ?, POINT(${longitud}, ${latitud}), ?, ?, ?, ?, ?, ?, ?)`, 
        [  descripcion, precioHora, experiencia, telefono, 0, null, null, null, usuarioId, ramaId ]
    );
}

const updateConfigurationFieldsTrans = async (db, { id, descripcion, precioHora, experiencia, latitud, longitud, telefono, ramaId, nombreRamaNueva }) => {
    let auxRamaId = 1;
    if (ramaId) {
        auxRamaId = ramaId;
    }
    if (nombreRamaNueva) {
        auxRamaId = (await createTransRama(db, fields.nombreRamaNueva)).insertId;
    }

    return executeQueryTrans(
        db,
        `update profesores set descripcion = ?, precioHora = ?, experiencia = ?, coordenadas = POINT(${longitud}, ${latitud}), telefono = ?, ramaId = ? where (id = ?)`, 
        [  descripcion, precioHora, experiencia, telefono, ramaId, id ]
    );
}

const create = async (fields) => {
    const emailEnabled = process.env.EMAIL_ENABLED;

    let profesorId, emailId;
    const db = await beginTransaction();
    try {         
        let ramaId = 1;
        if (fields.ramaId) {
            ramaId = fields.ramaId;
        }
        if (fields.nombreRamaNueva) {
            ramaId = (await createTransRama(db, fields.nombreRamaNueva)).insertId;
        }

        const usuarioId = (await createTransUsuario (db, {...fields, rolId: profesorRoleId        })).insertId;
        profesorId      = (await createTransProfesor(db, {...fields, usuarioId, ramaId            })).insertId;
        if (emailEnabled) {
            emailId     = (await createTransEmailPendiente(db, EmailTypes.ALTA_PROFESOR, usuarioId )).insertId;
        }

        await commit(db);
    }
    catch(error) {
        await rollBack(db);
        throw error;
    }

    if (emailEnabled) {
        // No esperamos la resolución de la promesa, ni tratamos el error aquí
        // (quedaría anotado en la tabla que está pendiente, y el proceso encargado
        //  de enviar los pendientes lo hará cuando pueda).
        sendMailDataLoaded({ id: profesorId, fields })
            .then()
            .catch();
    }

    return profesorId;
}

const validate = (id) => {    
    return executeQuery(
        `update profesores set validado = 1 where (id = ?)`, 
        [ id ]
    );
}

const getById = (id) => {
    return executeQueryOne(
        `select p.id as id, ${no_key_columnsLonLat}, nombre as nombreRama from profesores as p left join ramas as r on (p.ramaId = r.id) where (p.id = ?)`, 
        [ id ]
    );
}

const getByUserId = (usuariosId) => {
    return executeQueryOne(
        `select p.id as id, ${no_key_columnsLonLat}, nombre as nombreRama from profesores as p left join ramas as r on (p.ramaId = r.id) where (p.usuarioId = ?)`, 
        [ usuariosId ]
    );
}

const updatePuntuacionTrans = (db, { id, puntuacionTotal, numeroPuntuaciones }, puntuacionVariation) => {
    if ((numeroPuntuaciones !== null) && 
        (numeroPuntuaciones !== 0   ) &&
        (puntuacionTotal     !== null)) {        
        const newPuntuacionTotal = puntuacionTotal + puntuacionVariation;
        const newPuntuacionMedia = newPuntuacionTotal / numeroPuntuaciones;
        return executeQueryTrans(
            db,
            `update profesores set puntuacionTotal = ?, puntuacionMedia = ? where (id = ?)`, 
            [ newPuntuacionTotal, newPuntuacionMedia, id ]
        );
    }
}

const addPuntuacionTrans = (db, { id, puntuacionTotal, numeroPuntuaciones }, puntuacion) => {
    let newNumeroPuntuaciones, newPuntuacionTotal, newPuntuacionMedia;
    if ((numeroPuntuaciones != null) && (puntuacionTotal != null)) {
        newNumeroPuntuaciones = numeroPuntuaciones + 1;
        newPuntuacionTotal    = puntuacionTotal + puntuacion;
        newPuntuacionMedia    = newPuntuacionTotal / newNumeroPuntuaciones;
    } else {
        newNumeroPuntuaciones = 1;
        newPuntuacionTotal    = puntuacion;
        newPuntuacionMedia    = puntuacion;
    }

    return executeQueryTrans(
        db,
        `update profesores set puntuacionTotal = ?, puntuacionMedia = ?, numeroPuntuaciones = ? where (id = ?)`, 
        [ newPuntuacionTotal, newPuntuacionMedia, newNumeroPuntuaciones, id ]
    );
}

const searchFields = ['id', 'descripcion', 'precioHora', 'experiencia', 'telefono', 'validado', 'puntuacionMedia', 'puntuacionTotal', 
                     'numeroPuntuaciones', 'usuarioId', 'ramaId', 'userName', 'nombreCompleto', 'email', 'imagen', 'rolId'];
const search = ({ searchConditions, orderByConditions }, page, limit) => {    

    const fieldsResult = `p.id, userName, nombreCompleto, email, imagen, rolId, ${no_key_columnsLonLat}, nombre as nombreRama`;
    let selectSentence = 'select ? from profesores as p inner join usuarios as u on (p.usuarioId = u.id) ' +
                                                       'inner join ramas as r on (p.ramaId = r.id)';
    
    const whereClause   = getWhereClause(searchFields, searchConditions, 'p.');    
    const orderByClause = getOrderByClause(searchFields, orderByConditions, 'p.');
    const limitClause   = getLimitClause(limit, page);

    return Promise.all([
            executeQuery(selectSentence.replace('?', fieldsResult) + whereClause + orderByClause + limitClause, []),
            limit ? executeQueryOne(selectSentence.replace('?', getPagesCountClause(limit)) + whereClause, [])
                  : { pages: 1 }
    ]);
}

const searchByAlumnoId = ({ searchConditions, orderByConditions }, idAlumno, page, limit) => {    

    const fieldsResult = `p.id, userName, nombreCompleto, email, imagen, rolId, ${no_key_columnsLonLat}, nombre as nombreRama`;
    let selectSentence = 'select ? from profesores as p inner join usuarios as u on (p.usuarioId = u.id) '     +
                                                    'inner join inscripciones as i on (p.id = i.profesoresId) ' +
                                                    'inner join alumnos as a on (a.id = i.alumnosId) ' +
                                                    'inner join ramas as r on (p.ramaId = r.id)';
    
    const whereClause   = getWhereClause(searchFields, searchConditions, 'p.', `(a.id = ${idAlumno}) and (validado = 1)`);
    const orderByClause = getOrderByClause(searchFields, orderByConditions, 'p.');
    const limitClause   = getLimitClause(limit, page);

    return Promise.all([
            executeQuery(selectSentence.replace('?', fieldsResult) + whereClause + orderByClause + limitClause, []),
            limit ? executeQueryOne(selectSentence.replace('?', getPagesCountClause(limit)) + whereClause, [])
                  : { pages: 1 }
    ]);
}

const searchFieldsPublic = ['id', 'descripcion', 'precioHora', 'experiencia', 'telefono', 'validado', 'puntuacionMedia', 'puntuacionTotal', 
                            'numeroPuntuaciones', 'usuarioId', 'ramaId', 'userName', 'nombreCompleto', 'email', 'imagen', 'rolId', 'distancia'];
const searchPublic = ({ latitud, longitud, maximaDistancia, searchConditions, orderByConditions }, bLogged, page, limit) => {    

    let fieldsResult = `p.id, userName, nombreCompleto, email, imagen, rolId, ${no_key_columnsLonLat}, nombre as nombreRama, ST_Distance_Sphere(point(${longitud}, ${latitud}), coordenadas) as distancia `;

    if (!bLogged) { // Estos campos solo aparecen en el resultado si está logeado el usuario.
        fieldsResult = fieldsResult.replace(', email',    '')
                                   .replace(', telefono', '');
    }

    let selectSentence = 'select ? from profesores as p inner join usuarios as u on (p.usuarioId = u.id) ' +
                                                       'inner join ramas as r on (p.ramaId = r.id)';
    
    const whereClause   = getWhereClause(searchFieldsPublic, searchConditions, 'p.', `(validado = 1) and (ST_Distance_Sphere(point(${longitud}, ${latitud}), coordenadas) <= ${maximaDistancia})`);
    const orderByClause = getOrderByClause(searchFieldsPublic, orderByConditions, 'p.');
    const limitClause   = getLimitClause(limit, page);

    return Promise.all([
            executeQuery(selectSentence.replace('?', fieldsResult) + whereClause + orderByClause + limitClause, []),
            limit ? executeQueryOne(selectSentence.replace('?', getPagesCountClause(limit)) + whereClause, [])
                  : { pages: 1 }
    ]);
}

module.exports = { create, validate, getById, getByUserId, updateConfigurationFieldsTrans, updatePuntuacionTrans, addPuntuacionTrans, search, searchByAlumnoId, searchPublic, searchFields, searchFieldsPublic };
