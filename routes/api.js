var express = require('express');
var router = express.Router();

router.use('/payment', require('./payment'));
router.use('/birds', require('./birds'));

module.exports = router;
