const express = require('express');
const router = express.Router();
var model = require('../models');


router.use('/product', require('../models/api/product'))
router.use('/coins', require('../models/api/machineCoin'))
router.use('/transaction', require('../models/api/transaction'))

module.exports = router;