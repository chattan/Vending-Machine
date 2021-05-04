const router = require('express').Router()
const TransactionController = require('./TransactionController')
const {buyValidation,refundValidation} = require('./TransactionValidation')

router.get('/', TransactionController.index.bind(TransactionController))
router.post('/buy',buyValidation, TransactionController.store.bind(TransactionController))
router.put('/refund',refundValidation, TransactionController.refund.bind(TransactionController))
module.exports = router