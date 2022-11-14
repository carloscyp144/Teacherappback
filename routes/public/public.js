const router = require('express').Router();

router.use('/profesores',  require('./profesores/profesores.public'));
router.use('/alumnos',  require('./alumnos/alumnos.public'));
router.use('/administradores',  require('./administradores/administradores.public'));

module.exports = router;