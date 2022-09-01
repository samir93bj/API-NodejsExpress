const express = require('express');
const router = express.Router();

const validatorHandler = require('../middlewares/validator.handler');
const { validateFileUpload } = require('../middlewares/file.handler');
const { checkRoles }  = require('../middlewares/auth.handler');
const {updateCollectionSchema, validateExtension} = require('../schemas/loadMassive.schema');

const loadMassive = require('../services/loadMassive.service');
const service = new loadMassive();

const passport = require('passport');

router.post('/:collection',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validateFileUpload,
  validatorHandler(updateCollectionSchema, 'params'),
  async(req, res, next) => {

    try{
      const nameFile = await validateExtension(req.files.file);
      const resp = await service.uploadService(req.files.file ,nameFile);

      const resps = service.transformDataJson();
      console.log(resps);

      res.status(201).json({
        msg:"Create Massive success"
      });

    }
    catch(err){
      next(err);
    }

  }
);

router.put('/:collection',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validateFileUpload,
  validatorHandler(updateCollectionSchema, 'params'),
  async(req, res, next) => {

    try{
      const collection = req.params.collection;

      const nameFile = await validateExtension(req.files.file);
      const resp = await service.uploadServicePut(collection, req.files.file, nameFile);

      //const resps = service.transformDataJson();
      //console.log(resps);

      res.status(201).json({
        msg:"Create Massive success",
        resp
      });

    }
    catch(err){
      next(err);
    }

  }
);

module.exports = router;
