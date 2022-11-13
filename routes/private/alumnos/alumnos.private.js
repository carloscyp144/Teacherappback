const router = require('express').Router();

// Actualización de los datos de un alumno.
// (Solo lo puede hacer él mismo)
router.post(
    '/register', 
    checkSchema(alumnoValidationSchema),
    checkValidationsResult,
    async (req, res) => {
        try {
            req.body.password = bcrypt.hashSync(req.body.password, 8);

            const result = await create(req.body);
            const alumno = await getById(result.insertId);
            res.json(alumno);
        } catch (error) {
            manageRouterError(res, error);
        }
    }
);

module.exports = router;