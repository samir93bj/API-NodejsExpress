const express = require('express')
const CartService = require('../services/cart.service')
const router = express.Router()

const cartService = new CartService()

/*
  TODO: Finalizar los servicos de cart
*/
router.get('/', async (req, res, next) => {
  try {
    const cart = await cartService.find()
    return res.status(200).json(cart)
  } catch (err) {
    next(err)
  }
})

module.exports = router
