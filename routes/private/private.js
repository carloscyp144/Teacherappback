const router = require('express').Router();

router.use('/alumnos',  require('./alumnos/alumnos.private'));
router.use('/usuarios',  require('./usuarios/usuarios.private'));
router.use('/profesores',  require('./profesores/profesores.private'));
router.use('/inscripciones',  require('./inscripciones/inscripciones.private'));

module.exports = router;