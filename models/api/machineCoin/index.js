const router = require('express').Router()
const MachineCoinController = require('./MachineCoinController')

router.get('/', MachineCoinController.index.bind(MachineCoinController))
module.exports = router