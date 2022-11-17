const { executeQueryTrans, executeQueryOne, beginTransaction, rollBack, commit, executeQuery } = require('../helpers/mysql_utils');
const { createTransUsuario } = require('./usuarios.model');
const { createTransRama } = require('./ramas.model');
const { profesorRoleId } = require('./roles.model');

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
    let profesorId;
    const db = await beginTransaction();
    try {         
        let ramaId = 1;
        if (fields.ramaId) {
            ramaId = fields.ramaId;
        }
        if (fields.nombreRamaNueva) {
            ramaId = (await createTransRama(db, fields.nombreRamaNueva)).insertId;
        }

        const usuarioId = (await createTransUsuario (db, {...fields, rolId: profesorRoleId})).insertId;
        profesorId      = (await createTransProfesor(db, {...fields, usuarioId, ramaId    })).insertId;        

        await commit(db);
    }
    catch(error) {
        await rollBack(db);
        throw error;
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

module.exports = { create, validate, getById, getByUserId, updateConfigurationFieldsTrans, updatePuntuacionTrans, addPuntuacionTrans };
