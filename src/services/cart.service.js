const models = require('../libs/sequalize')

/*
  TODO: Add services to cart
*/
class CartService {
  async find () {
    const cart = await models.Cart.find()

    return cart
  }
}

module.exports = CartService
