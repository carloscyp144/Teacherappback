const router = require('express').Router();

const { getByPage, getAll } = require('../../../models/ramas.model');

// Recuperamos todas las ramas o de manera paginada.
router.get(
    '/', 
    async (req, res) => {        
        try {
            const { page, limit } = req.query;

            let ramas;
            if (page && limit) { // Creo que no es muy útil si no se sabe el número filas en el front...
                ramas = await getByPage(parseInt(page), parseInt(limit));
            }
            else {
                ramas = await getAll();
            }
            
            res.json(ramas);
        } catch (error) {            
            manageError(res, error);
        }
    }
);

module.exports = router;