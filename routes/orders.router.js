const express = require('express');
const orderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createOrderSchema, updateOrderSchema, getOrderSchema } = require('../schemas/order.schema');

const router = express.Router();

const service = new orderService();

//GET USERS
router.get('/',
  async(req,res,next) => {

    try{
      const orders = await service.find();


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
  validatorHandler(getOrderSchema,'params'),
  async (req,res,next) => {

    try{
      const id = req.params.id;
      const order = await service.findOne(id);


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
  validatorHandler(updateOrderSchema,'body'),
  async (req,res,next) => {
    try{

      const data = req.body;

      const order = await service.create(data);


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
validatorHandler(getOrderSchema,'params'),
validatorHandler(updateOrderSchema,'body'),
  async (req,res,next) => {

    try{
      const id = req.params.id;
      const data = req.body;

      const order = await service.patch(id ,data);


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
  validatorHandler(getOrderSchema,'params'),
  async (req,res,next) => {

    try{
      const id = req.params.id;
      const orderDelete = await service.delete(id);


        res.status(200).json({
          message:"User Deleted",
          orderDelete
        });
      }catch(err){
        next(err);
      }
})

module.exports = router;
