const { checkSchema } = require('express-validator')
const  {Product,Transactions}  = require('../../../models')
const CONSTANTS = require('../../../app/constant/Constants')
const schema = {
  'product_id': {
    trim: true,
    isLength: {
      errorMessage: 'Product is required',
      options: { min: 1 },
    },
    custom: {
      options: (value, { req, location, path }) => {
        return new Promise((resolve, reject) => {
          let query = { id: req.body.product_id}
          Product.findOne({ where: query }).then(function (product) {
            if (product){
            	if (product.stock <= 0) reject("Product out of stock")
            }else{
            	reject("Product not found.")
            } 
            resolve(true)
          })
        })
      },
    },
  },
  'amount': {
  	trim: true,
  	isLength: {
  		errorMessage: 'Payment amount is required',
  		options: { min: 1 },
  	},
  	 custom: {
      options: (value, { req, location, path }) => {
        return new Promise((resolve, reject) => {
          let query = { id: req.body.product_id}
          Product.findOne({ where: query }).then(function (product) {
          	if(product){
          		if (req.body.amount < product.price) reject("Amount insufficient.")
          	}
            
            resolve(true)
          })
        })
      },
    },
  }
}

const refund = {
 'transaction_id': {
    trim: true,
    isLength: {
      errorMessage: 'Transaction id is required',
      options: { min: 1 },
    },
    custom: {
      options: (value, { req, location, path }) => {
        return new Promise((resolve, reject) => {
          let query = { transaction_id: req.body.transaction_id}
          Transactions.findOne({ where: query }).then(function (transaction) {
            if (!transaction)reject("Transaction not found.")
            else if(transaction.status == CONSTANTS.TRANSACTION_STATUS.REFUND) reject("Already refunded")
            resolve(true)
          })
        })
      },
    },
  },
}

exports.buyValidation = checkSchema(schema)
exports.refundValidation = checkSchema(refund)
