const { executeQueryTrans, executeQueryOne, beginTransaction, rollBack, commit } = require('../helpers/mysql_utils');
const { createTransUsuario } = require('./usuarios.model');
const { createTransRama } = require('./ramas.model');
const { profesorRoleId } = require('./roles.model');

const key_columns          = 'id';
const no_key_columns       = 'descripcion, precioHora, experiencia, coordenadas, telefono, validado, puntuacionMedia, puntacionTotal, numeroPuntuaciones, usuarioId, ramaId';
const no_key_columnsLonLat = 'descripcion, precioHora, experiencia, ST_X(coordenadas) AS longitud, ST_Y(coordenadas) AS latitud, telefono, validado, puntuacionMedia, usuarioId, ramaId';

const createTransProfesor = (db, { descripcion, precioHora, experiencia, latitud, longitud, telefono, usuarioId, ramaId }) => {    
    return executeQueryTrans(
        db,
        `insert into profesores (${no_key_columns}) values (?, ?, ?, POINT(${longitud}, ${latitud}), ?, ?, ?, ?, ?, ?, ?)`, 
        [  descripcion, precioHora, experiencia, telefono, 0, null, null, null, usuarioId, ramaId ]
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

module.exports = { create, getById, getByUserId };
