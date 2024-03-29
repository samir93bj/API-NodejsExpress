const express = require('express')
const UsersService = require('../services/user.service')
const validatorHandler = require('../middlewares/validator.handler')
const passport = require('passport')
const { checkRoles } = require('../middlewares/auth.handler')

const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/user.schema')

const router = express.Router()

const service = new UsersService()

// GET USERS
router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    const users = await service.find()

    try {
      res.status(200).json({
        message: 'User List',
        users
      })
    } catch (err) {
      next(err)
    }
  })

// GET USER
router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = req.params.id
      const user = await service.findOne(id)

      res.status(200).json({
        message: 'Get user',
        user
      })
    } catch (error) {
      next(error)
    }
  })

// POST USER
router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body

      const user = await service.create(data)

      res.status(200).json({
        message: 'User created',
        user
      })
    } catch (err) {
      next(err)
    }
  })

// PATCH USER
router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const id = req.params.id
      const data = req.body

      const user = await service.update(id, data)

      res.status(200).json({
        message: 'User updated',
        user
      })
    } catch (err) {
      next(err)
    }
  })

// DELETE USER
router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = req.params.id
      const userDeleted = await service.delete(id)

      res.status(200).json({
        message: 'User Deleted',
        userDeleted
      })
    } catch (err) {
      next(err)
    }
  })

module.exports = router
