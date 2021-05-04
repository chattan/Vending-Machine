const  {Product}  = require('../../../models')

class ProductService {
  constructor () {
    this._model = Product
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

  async decreaseStock(id){
  	var product = await this.getById(id)
  	var newStock = product.stock - 1
  	return this._model.update({stock:newStock}, { where: { id: id }, returning: true })
  }

  async increaseStock(id){
  	var product = await this.getById(id)
  	var newStock = product.stock + 1
  	return this._model.update({stock:newStock}, { where: { id: id }, returning: true })
  }

  async getById(id){
  	return this._model.findOne({ where: { id: id } });
  }

}

module.exports = ProductService
