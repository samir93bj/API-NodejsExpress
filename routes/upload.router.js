const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const passport = require('passport');
const { checkRoles }  = require('../middlewares/auth.handler');
const { validateFileUpload }  = require('../middlewares/file.handler');
const { validateExtension, updateCollectionSchema} = require('../schemas/upload.schema');
const uploadService = require('../services/upload.service');

//router
const router = express.Router();

//service
const service = new uploadService();

//POST
router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validateFileUpload,
  async(req, res,next) => {
    try{

      const nameFile = await validateExtension(req.files.file);
      const resp = await service.uploadService(req.files.file ,nameFile);

      res.status(201).json({
        status: "File upload success",
        resp
      });

    }catch(err){
      next(err);
    }
});

//PUT
router.put('/:collection/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin','customers'),
  validatorHandler(updateCollectionSchema , 'params'),
  async(req,res,next)=>{

    try{
      const id = req.params.id;
      const collection = req.params.collection;

      const resp = await service.uploadCloudinaryService(id, collection);

      res.status(200).json({
        msg:'File updated',
        resp
      });

    }catch(err){
      next(err);
    }
});

//DELETE


module.exports = router;




