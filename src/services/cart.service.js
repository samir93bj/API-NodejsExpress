const models = require('../libs/sequalize')

class CartService {
  async find () {
    const cart = await models.Cart.find()

    return cart
  }
}

module.exports = CartService
