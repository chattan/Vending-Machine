const  {Transactions}  = require('../../../models')
const ProductService = require('../product/ProductService')
const MachineCoinService = require('../machineCoin/MachineCoinService')
const CONSTANTS = require('../../../app/constant/Constants')
class TransactionService {
  constructor () {
    this._model = Transactions
    this.productService = new ProductService()
    this.machineCoinService = new MachineCoinService()
  }

  async all (req) {
  
    const [items] = await Promise.all([
      this._model.findAll({
        order: [
          ['id', 'DESC'],
        ],
      })
    ])
    return items
  }

 async store (req) {
    const data =  await this.handleRequest(req)
    return this._model.create(data)
  }

  async handleRequest (req) {
  	
  	let product = await this.productService.getById(req.body.product_id) 
  	await this.productService.decreaseStock(req.body.product_id)
  	await this.machineCoinService.updateAmount(product.price,CONSTANTS.TRANSACTION_STATUS.PAID)
  	let payback = req.body.amount - product.price
  	let transactionId = await this.getTransactionId()
  	return {
  		transaction_id : transactionId,
  		product_id : req.body.product_id,
  		amount_received : req.body.amount,
  		amount_payback : payback>0 ? payback : 0,
  		status : CONSTANTS.TRANSACTION_STATUS.PAID,
  	}
  }

  async refund (req) {
  	let transaction = await this.getByTransactionId(req.body.transaction_id)
  	await this.productService.increaseStock(transaction.product_id)
  	await this.machineCoinService.updateAmount((transaction.amount_received - transaction.amount_payback),CONSTANTS.TRANSACTION_STATUS.REFUND)
  	return transaction.update({'status':CONSTANTS.TRANSACTION_STATUS.REFUND})
  }

  async getTransactionId(){
  	var min = 11111;
  	var max = 99999;
  	var unique = false
  	var id
  	//generate a unique number for transaction
  	do {
  		id = Math.floor(Math.random() * (max - min) + min)
  		unique = await this.checkUnique(id)
  	} while(!unique)
  	
  	return id
  	
  }

   async checkUnique(id){
  	let transaction = await this.getByTransactionId(id);
    if (transaction) return false;
    else return true;
  }

  async getByTransactionId(transaction_id){
  	return this._model.findOne({ where: { transaction_id: transaction_id.toString() } });
  }
}

module.exports = TransactionService
