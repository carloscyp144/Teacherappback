const router = require('express').Router();

router.use('/public',  require('./public/public'));
router.use('/private', require('./private/private'));

module.exports = router;