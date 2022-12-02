const dayjs = require('dayjs');
const { executeQueryOne, executeQueryTrans, beginTransaction, commit, rollBack } = require('../helpers/mysql_utils');
const { createTransConversacion, getByProfesorIdAlumnoIdTrans, undeleteTrans } = require('./conversaciones.model');

const key_columns    = 'id';
const no_key_columns = 'autor, destinatario, texto, fechaHora, leido, borradoProfesor, borradoAlumno, conversacionesId';
const columns        = `${key_columns}, ${no_key_columns}`;

const createTransMensaje = (db, autor, destinatario, texto, converacionesId) => {    
    return executeQueryTrans(
        db,
        `insert into mensajes (${no_key_columns}) values (?, ?, ?, ?, ?, ?, ?, ?)`, 
        [ autor, destinatario, texto, dayjs().format('YYYY-MM-DD hh:mm:ss'), 0, 0, 0, converacionesId]
    );
}

const getById = (id) => {
    return executeQueryOne(
        `select ${columns} from mensajes where (id = ?)`, 
        [ id ]
    );
}

const create = async (profesoresId, alumnosId, autor, destinatario, texto) => {
    const db = await beginTransaction();
    let idMensaje;
    try {
        const conversacion = await getByProfesorIdAlumnoIdTrans(db, profesoresId, alumnosId);

        let conversacionId;
        if (conversacion === null) {
            conversacionId = (await createTransConversacion(db, profesoresId, alumnosId)).insertId;
        } else {
            conversacionId = conversacion.id;
            await undeleteTrans(db, conversacion.id);
        }

        idMensaje = (await createTransMensaje(db, autor, destinatario, texto, conversacionId)).insertId;

        await commit(db);
    } catch(exception) {
        await rollBack(db);
        throw exception;
    }
    
    return (await getById(idMensaje));
}

module.exports = { create };