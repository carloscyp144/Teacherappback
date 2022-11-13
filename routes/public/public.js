const router = require('express').Router();

router.use('/profesores',  require('./profesores/profesores'));
router.use('/alumnos',  require('./alumnos/alumnos'));

module.exports = router;