const express = require('express')
const validatorHandler = require('../middlewares/validator.handler')
const passport = require('passport')
const { checkRoles } = require('../middlewares/auth.handler')
const { validateFileUpload } = require('../middlewares/file.handler')
const { validateExtension, updateCollectionSchema } = require('../schemas/upload.schema')
const UploadService = require('../services/upload.service')

// router
const router = express.Router()

// service
const service = new UploadService()

// POST
router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validateFileUpload,
  async (req, res, next) => {
    try {
      const nameFile = await validateExtension(req.files.file)
      const resp = await service.uploadService(req.files.file, nameFile)

      res.status(201).json({
        status: 'File upload success',
        resp
      })
    } catch (err) {
      next(err)
    }
  })

// PUT
router.put('/:collection/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customers'),
  validateFileUpload,
  validatorHandler(updateCollectionSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = req.params.id
      const collection = req.params.collection

      const nameFile = await validateExtension(req.files.file)
      const resp = await service.uploadServicePut(id, collection, req.files.file, nameFile)

      res.status(200).json({
        msg: 'File updated',
        resp
      })
    } catch (err) {
      next(err)
    }
  })

// PUT
router.put('/cloudinary/:collection/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customers'),
  validateFileUpload,
  validatorHandler(updateCollectionSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = req.params.id
      const collection = req.params.collection

      validateExtension(req.files.file)
      const resp = await service.uploadCloudinaryService(id, collection, req.files.file)

      res.status(200).json({
        msg: 'File updated',
        resp
      })
    } catch (err) {
      next(err)
    }
  })

// DELETE

module.exports = router
