const express = require('express');
const Customer = require('../services/customer.service');
const router = express.Router();

const service = new Customer;

//GET CUSTOMERS
router.get('/',
  async(req,res,next)=>{
    try{

      const customer = await service.find();

      res.status(200).json({
        message:"Customers",
        customer
      });

    }catch(err){
      next(err)
    }
  }
);

//GET CUSTOMER
router.get('/:id',
  async(req,res,next)=>{
    try{

      const id = req.params.id;
      const customer = await service.findOne(id);

      res.status(200).json({
        message:"Customers",
        customer
      });

    }catch(err){
      next(err)
    }
  }
);

//POST CUSTOMER
router.post('/',
  async(req,res,next)=>{
    try{

      const data = req.body;
      const customer = await service.create(data);

      res.status(200).json({
        message:"Created Customer successfully",
        customer
      });

    }catch(err){
      next(err)
    }
  }
);

//PATCH CUSTOMER
router.patch('/:id',
async(req,res,next)=>{
  try{
    const id = req.params.id;
    const data = req.body;
    const customer = await service.patch(id,data);

      res.status(200).json({
        message:"Updated customer successfully",
        customer
      });

  }catch(err){
    next(err)
  }
}
);

//DELETE CUSTOMER
router.delete('/:id',

  async(req,res,next)=>{
    try{
      const id = req.params.id;
      const customer = await service.delete(id);

      res.status(200).json({
        message:"Delete success",
        customer
      });

    }catch(err){
      next(err)
    }
  }
);

module.exports = router;
