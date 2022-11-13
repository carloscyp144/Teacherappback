const router = require('express').Router();

router.use('/alumnos',  require('./alumnos/alumnos.private'));

module.exports = router;