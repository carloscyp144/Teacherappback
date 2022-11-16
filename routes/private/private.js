const router = require('express').Router();

router.use('/alumnos',  require('./alumnos/alumnos.private'));
router.use('/usuarios',  require('./usuarios/usuarios.private'));

module.exports = router;