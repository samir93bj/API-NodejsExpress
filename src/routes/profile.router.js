const express = require('express')
const ProductsService = require('../services/order.service')
const passport = require('passport')

// router
const router = express.Router()

// Servicios
const service = new ProductsService()

// GET MY ORDERS
router.get('/my-orders',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user
      const orders = await service.findByUser(user.sub)

      return res.status(200).json({
        orders
      })
    } catch (error) {
      next(error)
    }
  })

module.exports = router
