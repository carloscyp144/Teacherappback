const router = require('express').Router();

router.use('/profesores',  require('./profesores/profesores.public'));
router.use('/alumnos',  require('./alumnos/alumnos.public'));

module.exports = router;