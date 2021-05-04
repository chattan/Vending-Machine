const TransactionService = require('./TransactionService')
const format = require('../format/ResponseFormat')
const { validationResult } = require('express-validator')
const ErrorFormat = require('../format/ErrorFormat')
const ProductService = require('../product/ProductService')
const MachineCoinService = require('../machineCoin/MachineCoinService')

class TransactionController  {
  constructor () {
  	 this.service = new TransactionService()
  	 this.productService = new ProductService()
  	 this.machineCoinService = new MachineCoinService()
  }

   async index (req, res, next) {
    const list = await this.service.all(req)
    res.setHeader('Content-Type', 'application/json')
    return res.send(format.responseFormat(list))
  }

   async store (req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return this.handleValidationError(req, res, errors)
      }
      //check coin available
      let product = await this.productService.getById(req.body.product_id) 
      let paybackAmount = req.body.amount - product.price
      if(! await this.machineCoinService.checkCoin(paybackAmount)){
      		var code = "coin"
      		var message = "No enough coin for transaction"	
      		res.setHeader('Content-Type', 'application/json')
        	res.status(422)
      		return res.send(format.errorFormat(code,message,message))
      }
      let data = await this.service.store(req)
      res.setHeader('Content-Type', 'application/json')
      return res.send(format.responseFormat(data))
    } catch (e) {
      next(e)
    }
  }

   async refund (req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return this.handleValidationError(req, res, errors)
      }
       //check coin available
      let transaction = await this.service.getByTransactionId(req.body.transaction_id)
      let paybackAmount = transaction.amount_received - transaction.amount_payback
      if(! await this.machineCoinService.checkCoin(paybackAmount)){
      		var code = "coin"
      		var message = "No enough coin for transaction"	
      		res.setHeader('Content-Type', 'application/json')
        	res.status(422)
      		return res.send(format.errorFormat(code,message,message))
      }
      let data = await this.service.refund(req)
      res.setHeader('Content-Type', 'application/json')
      return res.send(format.responseFormat(data))
    } catch (e) {
      next(e)
    }
  }

  handleValidationError (req, res, errors) {
    res.setHeader('Content-Type', 'application/json')
    res.status(422)
    return res.send(ErrorFormat.errorFormat(errors.errors))
  }


}

module.exports = new TransactionController()
