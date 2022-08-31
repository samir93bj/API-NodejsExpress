const express = require('express');
const router = express.Router();

const validatorHandler = require('../middlewares/validator.handler');
const { checkRoles }  = require('../middlewares/auth.handler');
const {createCollectionSchema} = require('../schemas/loadMassive.schema');

const loadMassive = require('../services/loadMassive.service');
const service = new loadMassive();

const passport = require('passport');

router.post('/:collection',

  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),

  validatorHandler(createCollectionSchema, 'params'),
  async(req, res, next) => {

    try{
      const file = "File";
      const resp = service.createRegisters(file);

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
