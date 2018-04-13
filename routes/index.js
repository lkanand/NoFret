const express = require('express');

const router = express.Router();

router.use('/api', require('./apiRoutes'));


router.use(require('./htmlRoutes'));

module.exports = router;