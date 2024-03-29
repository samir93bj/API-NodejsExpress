const express = require('express')
const OrderService = require('../services/order.service')
const validatorHandler = require('../middlewares/validator.handler')
const { checkRoles } = require('../middlewares/auth.handler')
const { addItemSchema, updateOrderSchema, getOrderSchema } = require('../schemas/order.schema')
const passport = require('passport')

const router = express.Router()

const service = new OrderService()

// GET ORDERS
router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),

  async (req, res, next) => {
    try {
      const orders = await service.find()

      res.status(200).json({
        message: 'Orders List',
        orders
      })
    } catch (err) {
      next(err)
    }
  })

// GET ORDER
router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),

  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = req.params.id
      const order = await service.findOne(id)

      res.status(200).json({
        message: 'Order Get',
        order
      })
    } catch (err) {
      next(err)
    }
  })

// POST ORDER
router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),

  async (req, res, next) => {
    try {
      const data = { userId: req.user.sub }
      const order = await service.create(data)

      res.status(200).json({
        message: 'Order created',
        order
      })
    } catch (err) {
      next(err)
    }
  })

// ADD ITEM
router.post('/add-item',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body

      const newItem = await service.addItem(data)

      res.status(200).json({
        message: 'Item Added',
        newItem
      })
    } catch (err) {
      next(err)
    }
  })

// PATCH ORDER
router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),

  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),

  async (req, res, next) => {
    try {
      const id = req.params.id
      const data = req.body

      const order = await service.patch(id, data)

      res.status(200).json({
        message: 'Order updated',
        order
      })
    } catch (err) {
      next(err)
    }
  })

// DELETE ORDER
router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = req.params.id
      const orderDelete = await service.delete(id)

      res.status(200).json({
        message: 'User Deleted',
        orderDelete
      })
    } catch (err) {
      next(err)
    }
  })

module.exports = router
