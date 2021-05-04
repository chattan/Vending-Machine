const router = require('express').Router()
const ProductController = require('./ProductController')

router.get('/', ProductController.index.bind(ProductController))
module.exports = router