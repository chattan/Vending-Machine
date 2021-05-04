const ProductService = require('./ProductService')
const format = require('../format/ResponseFormat')

class ProductController  {
  constructor () {
  	 this.service = new ProductService()
  }

   async index (req, res, next) {
    const list = await this.service.all(req)
    res.setHeader('Content-Type', 'application/json')
    return res.send(format.responseFormat(list))
  }

}

module.exports = new ProductController()
