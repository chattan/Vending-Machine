const MachineCoinService = require('./MachineCoinService')
const format = require('../format/ResponseFormat')

class MachineCoinController  {
  constructor () {
  	 this.service = new MachineCoinService()
  }

   async index (req, res, next) {
    const list = await this.service.all(req)
    res.setHeader('Content-Type', 'application/json')
    return res.send(format.responseFormat(list))
  }

}

module.exports = new MachineCoinController()
