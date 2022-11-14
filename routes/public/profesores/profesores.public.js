const router = require('express').Router();
const bcrypt = require('bcrypt');
const { checkSchema } = require('express-validator');

const { checkValidationsResult } = require('../../../helpers/validator_utils');
const { manageRouterError } = require('../../../helpers/router_utils');
const { commonLogin } = require('../login_utils');
const { beginTransaction, rollBack, commit } = require('../../../helpers/mysql_utils');
const { createTrans: createTransProfesor } = require('../../../models/profesores.model');
const { createTrans: createTransRama } = require('../../../models/ramas.model');
const { createTrans: createTransRamaProfesor } = require('../../../models/ramasprofesores.model');
const { getProfesorValidationSchema } = require('../../../helpers/validators/profesores.validator');

// Creación de un nuevo profesor.
router.post(
    '/register', 
    checkSchema(getProfesorValidationSchema(true)),
    checkValidationsResult,
    async (req, res) => {
        try {
            req.body.password = bcrypt.hashSync(req.body.password, 8);

            let   profesorId;
            const db = await beginTransaction();
            try {
                // Insertamos el profesor
                profesorId = (await createTransProfesor(db, req.body)).insertId;

                // Añadimos las ramas existentes al profesor
                if (req.body.ramas) {
                    req.body.ramas.forEach(async element => await createTransRamaProfesor(db, profesorId, element.ramaId));
                }

                // Creamos las ramas nuevas y se las asignamos al profesor
                if (req.body.nuevasRamas) {
                    let ramaId;
                    req.body.nuevasRamas.forEach(async element => {
                        ramaId = (await createTransRama(db, element.nombre)).insertId;
                        await createTransRamaProfesor(db, profesorId, ramaId);
                    });
                }

                await commit(db);
            }
            catch(error) {
                await rollBack(db);
                throw error;
            }

            profesor = await getById(result.insertId);
            res.json(profesor);
        } catch (error) {
            manageRouterError(res, error);
        }
    }
);

module.exports = router;