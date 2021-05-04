const  {MachineCoins}  = require('../../../models')
const CONSTANTS = require('../../../app/constant/Constants')
class MachineCoinService {
  constructor () {
    this._model = MachineCoins
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

  async updateAmount(amount,status){
  	const [data] = await this._model.findAll({limit: 1})
  	if(status == CONSTANTS.TRANSACTION_STATUS.PAID) {
  		//add amount
  		var newAmount = amount + data.amount
  	}else{
  		//decrease amount
  		var newAmount = data.amount - amount 
  	}
  	return this._model.update({amount:newAmount}, { where: { id: data.id }, returning: true })
  }
  
//check if enough coin is available for transaction
  async checkCoin(amount){
    const [data] = await this._model.findAll({limit: 1})
    if(data.amount >= amount ) return true
    else return false
  }

}

module.exports = MachineCoinService
