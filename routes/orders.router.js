const express = require('express');
const orderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createOrderSchema, updateOrderSchema, getOrderSchema } = require('../schemas/order.schema');

const router = express.Router();

const service = new orderService();

//GET USERS
router.get('/',
  async(req,res,next) => {

    const orders = await service.find();

    try{
      res.status(200).json({
        message:"Orders List",
        orders
      });
    }catch(err){
      next(err);
    }

});

//GET USER
router.get('/:id',
  async (req,res,next) => {

    const id = req.params.id;
    const order = await service.findOne(id);

    try{
      res.status(200).json({
        message:"Order Get",
        order
      });
    }catch(err){
      next(err);
    }

})

//POST USER
router.post('/',
  async (req,res,next) => {

    const data = req.body;

    const order = await service.create(data);

    try{
      res.status(200).json({
        message:"Order created",
        order
      });
    }catch(err){
      next(err);
    }

})

//PATCH USER
router.patch('/:id',
  async (req,res,next) => {

    const id = req.params.id;
    const data = req.body;

    const order = await service.update(id ,data);

    try{
      res.status(200).json({
        message:"Order updated",
        order
      });
    }catch(err){
      next(err);
    }

})

//DELETE USER
router.delete('/:id',

  async (req,res,next) => {

    const id = req.params.id;
    const orderDelete = await service.delete(id);

    try{
      res.status(200).json({
        message:"User Deleted",
        orderDelete
      });
    }catch(err){
      next(err);
    }

})

module.exports = router;
